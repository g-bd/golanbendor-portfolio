"""Export compact portfolio geometry from the user's read-only validation viewer."""
import hashlib
import json
import math
from pathlib import Path

SOURCE = Path(r'G:\golan\work\consultant\dev\eshed\projects\validation-viewer\frontend\public')
ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((SOURCE/'data/manifest.json').read_text(encoding='utf-8'))
areas = manifest['modules']['counts']['areas']

def load(name):
    return json.loads((SOURCE/name.lstrip('/')).read_text(encoding='utf-8'))

def simplify(points, epsilon=.00015):
    if len(points)<3: return points
    a,b=points[0],points[-1]; dx=b[0]-a[0]; dy=b[1]-a[1]; norm=math.hypot(dx,dy)
    distances=[abs(dy*p[0]-dx*p[1]+b[0]*a[1]-b[1]*a[0])/norm if norm else math.dist(a,p) for p in points[1:-1]]
    maximum=max(distances)
    if maximum<=epsilon: return [a,b]
    i=distances.index(maximum)+1
    return simplify(points[:i+1],epsilon)[:-1]+simplify(points[i:],epsilon)

def paths(feature):
    g=feature['geometry']; p=g['coordinates']
    lines=p if g['type']=='MultiLineString' else [p]
    return [[[round(c[0],5),round(c[1],5)] for c in simplify(line)] for line in lines]

out={}
for source,key in [('tlvm','telaviv'),('jlm','jerusalem'),('haifa','haifa'),('bs','beersheva')]:
    layer=areas[source]['layers']
    selected=load(layer['selected']['file'])['features']; zones=load(layer['zones']['file'])['features']
    rings=[]
    for zone in zones:
        g=zone['geometry']; polys=[g['coordinates']] if g['type']=='Polygon' else g['coordinates']
        for polygon in polys:
            rings.extend([[[round(c[0],5),round(c[1],5)] for c in simplify(ring)] for ring in polygon])
    links=[]
    for f in selected:
        p=f['properties']
        links.append(dict(n=p.get('NAME'),r=str(p['ROADNUMBER']) if p.get('ROADNUMBER') else None,c=p['centrality'],l=round(p['_length_m']),p=paths(f)))
    assert len(links)==areas[source]['stats']['selected']
    out[key]=dict(links=links,zones=rings)

dest=ROOT/'src/data/countsMapData.ts'
header=dest.read_text(encoding='utf-8').split('export const COUNTS_METROS')[0]
header=header.replace('scripts/gen-counts-map-data.py','scripts/export-survey-evidence.py').replace('simplified from the QGIS network-analysis exports.', 'simplified from validation-viewer export 2026-09-07.')
dest.write_text(header+'export const COUNTS_METROS: Record<MetroKey, MetroData> = '+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')

features=load(areas['tlvm']['layers']['all_links']['file'])['features']
coords=[p for f in features for line in paths(f) for p in line]
x0=min(p[0] for p in coords); x1=max(p[0] for p in coords); y0=min(p[1] for p in coords); y1=max(p[1] for p in coords)
w=600*(x1-x0)*math.cos(math.radians(32))/(y1-y0)
def d(f):
    return ''.join('M'+'L'.join(f'{10+(p[0]-x0)/(x1-x0)*(w-20):.1f},{10+(y1-p[1])/(y1-y0)*580:.1f}' for p in line) for line in paths(f))
eligible=[f for f in features if f['properties']['eligible_for_sampling']]
selected=[]
for f in features:
    p=f['properties']
    if not p['selected']: continue
    z=p.get('zone_id')
    rank=1+sum(q['properties']['centrality']>p['centrality'] for q in eligible if q['properties'].get('zone_id')==z) if z is not None else None
    selected.append(dict(id=p['ID'],name=p.get('NAME'),road=p.get('ROADNUMBER'),score=p['centrality'],length=round(p['_length_m']),rank=rank,d=d(f)))
payload=dict(width=round(w,1),network=''.join(d(f) for f in features),eligible=''.join(d(f) for f in eligible),links=selected,stats={k:areas['tlvm']['stats'][k] for k in ['total','eligible','selected','zones','zones_with_selection']},date=manifest['baked_at'][:10])
(ROOT/'src/data/surveyEvidence.json').write_text(json.dumps(payload,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
summary=dict(source_manifest_sha256=hashlib.sha256((SOURCE/'data/manifest.json').read_bytes()).hexdigest(),counts={k:len(v['links']) for k,v in out.items()},total_selected=sum(len(v['links']) for v in out.values()))
(ROOT/'.audit/2026-09-09/survey-export.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary));print('Compact explainer bytes:',(ROOT/'src/data/surveyEvidence.json').stat().st_size)
