"""Stream MATSim run 22 into an aggregate, static city-detail replay.

Vehicle identifiers stay in transient memory only. No plans or personal attributes
are read or exported. Counts include first-link traffic entries and entered-link
events for vehicles whose current network mode is car. They are unexpanded
simulated link entries, not unique journeys, people or observed counts.
"""
import gzip
import hashlib
import json
import re
import time
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path(r'E:\backups\old-comp\e_backup_260119\Golan\Jerusalem MATSim\MATSim output\22')
with gzip.open(SOURCE/'22.output_network.xml.gz','rb') as f:network=ET.parse(f).getroot()
with gzip.open(SOURCE/'22.output_transitVehicles.xml.gz','rb') as f:transit_xml=ET.parse(f).getroot()
# MATSim uses networkMode=car even for these scheduled transit vehicles.
# Exclude them explicitly rather than treating a network mode as a vehicle class.
transit={v.get('id') for v in transit_xml.iter() if v.tag.rsplit('}',1)[-1]=='vehicle'}
nodes={n.get('id'):(float(n.get('x')),float(n.get('y'))) for n in network.findall('./nodes/node')}
# Explicit EPSG:2039 urban-detail viewport. Full-network external connections are omitted.
bounds=(210000,623000,226000,646000)
def inside(point):return bounds[0]<=point[0]<=bounds[2] and bounds[1]<=point[1]<=bounds[3]
def project(point):return [round((point[0]-bounds[0])/100,1),round((bounds[3]-point[1])/100,1)]
links=[];lookup={}
for link in network.findall('./links/link'):
    if 'car' not in link.get('modes','').split(','):continue
    a,b=nodes[link.get('from')],nodes[link.get('to')]
    if not(inside(a) and inside(b)):continue
    lookup[link.get('id')]=len(links)
    links.append({'a':project(a),'b':project(b),'bins':[0]*96})
vehicles={};counters=Counter();types=Counter();attrs=re.compile(r'(\w+)="([^"]*)"');begin=time.time()
digest=hashlib.sha256()
with (SOURCE/'22.output_events.xml.gz').open('rb') as raw:
    for block in iter(lambda:raw.read(1024*1024),b''):digest.update(block)
with gzip.open(SOURCE/'22.output_events.xml.gz','rt',encoding='utf-8') as source:
    for line in source:
        if '<event ' not in line:continue
        event=dict(attrs.findall(line));kind=event.get('type','');types[kind]+=1;counters['events']+=1
        vehicle=event.get('vehicle')
        if kind=='vehicle enters traffic':vehicles[vehicle]=event.get('networkMode')
        if kind in ('vehicle enters traffic','entered link') and vehicles.get(vehicle)=='car' and vehicle not in transit:
            counters['car_link_entries']+=1
            i=lookup.get(event.get('link'))
            bucket=int(float(event.get('time','0'))//900)
            if i is None:counters['outside_detail']+=1
            elif not 0<=bucket<96:counters['outside_first_day']+=1
            else:links[i]['bins'][bucket]+=1;counters['included']+=1
        if kind=='vehicle leaves traffic':vehicles.pop(vehicle,None)
        if counters['events']%2000000==0:print(f"{counters['events']:,} events; {time.time()-begin:.1f}s",flush=True)
totals=[sum(link['bins'][i] for link in links) for i in range(96)]
assert sum(totals)==counters['included']
assert counters['included']+counters['outside_detail']+counters['outside_first_day']==counters['car_link_entries']
payload={'run':'22','recorded':'2020-06-24','scenario':'unidentified','binMinutes':15,'width':160,'height':230,'links':links,'totals':totals,'peak':max(max(link['bins']) for link in links),'bounds':bounds,'crs':'EPSG:2039','units':'unexpanded simulated car link entries'}
target=ROOT/'public/jerusalem-replay.json';target.write_text(json.dumps(payload,separators=(',',':')),encoding='utf-8')
audit={'source_sha256':digest.hexdigest(),'excluded_transit_vehicle_ids':len(transit),'counts':dict(counters),'event_types':dict(types),'detail_links':len(links),'bytes':target.stat().st_size,'gzip_bytes':len(gzip.compress(target.read_bytes())),'elapsed_seconds':round(time.time()-begin,1),'reconciliation':'passed','scenario_identity':'unresolved'}
(ROOT/'.audit/2026-09-09/jerusalem-extraction.json').write_text(json.dumps(audit,indent=2),encoding='utf-8')
print(json.dumps(audit,indent=2),flush=True)
