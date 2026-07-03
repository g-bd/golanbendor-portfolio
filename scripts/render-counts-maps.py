# Render metro network sampling maps in the drbendor.com site palette.
# Zones: faint glass-like polygons (like the site grid overlay).
# Sampled links: neon glow, colored by betweenness centrality (cyan -> pink).
import json
import math
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection
from matplotlib.colors import LinearSegmentedColormap, to_rgba

BG = '#0a0a12'
CYAN = '#00e5ff'
PINK = '#ff0055'
LIME = '#ccff00'

# cyan -> violet -> pink neon ramp (site accents)
cmap = LinearSegmentedColormap.from_list('pop', ['#00e5ff', '#7a5cff', '#ff0055'])

METROS = {
    'telaviv': r"C:\Users\User\Downloads\metro_maps\tlvm\layers",
    'jerusalem': r"C:\Users\User\Downloads\metro_maps\jlm\qgis2web_2026_05_20-10_45_05_433077\layers",
    'haifa': r"C:\Users\User\Downloads\metro_maps\haifa\qgis2web_2026_05_20-10_44_06_328634\layers",
    'beersheva': r"C:\Users\User\Downloads\metro_maps\bs\layers",
}

OUT = r"G:\golan\work\consultant\dev\utilities\portfolio\public"


def load_js_geojson(path):
    txt = open(path, encoding='utf-8').read()
    return json.loads(txt[txt.index('{'):])


def render(name, layers_dir):
    links = load_js_geojson(layers_dir + r"\AnalysisResults_2.js")
    zones = load_js_geojson(layers_dir + r"\Zones_1.js")

    # gather link segments + centrality
    segs, cents = [], []
    for f in links['features']:
        c = f['properties'].get('centrality') or 0.0
        geom = f['geometry']
        coords_list = geom['coordinates'] if geom['type'] == 'MultiLineString' else [geom['coordinates']]
        for line in coords_list:
            arr = np.array(line)
            segs.append(arr)
            cents.append(c)
    cents = np.array(cents)
    # log-normalize centrality for color
    logc = np.log10(cents + 1)
    norm = (logc - logc.min()) / (logc.max() - logc.min() + 1e-9)

    # extent from links, padded
    all_pts = np.vstack(segs)
    x0, y0 = all_pts.min(axis=0)
    x1, y1 = all_pts.max(axis=0)
    pad_x, pad_y = (x1 - x0) * 0.06, (y1 - y0) * 0.06
    x0, x1, y0, y1 = x0 - pad_x, x1 + pad_x, y0 - pad_y, y1 + pad_y

    mean_lat = (y0 + y1) / 2
    aspect = 1.0 / math.cos(math.radians(mean_lat))

    # figure size proportional to geo extent (corrected), max dim ~ 13 in
    w_geo = (x1 - x0)
    h_geo = (y1 - y0) * aspect
    scale = 13.0 / max(w_geo, h_geo)
    fig_w, fig_h = w_geo * scale, h_geo * scale

    fig, ax = plt.subplots(figsize=(fig_w, fig_h), dpi=150)
    fig.patch.set_facecolor(BG)
    ax.set_facecolor(BG)

    # zones: faint fill + hairline boundaries
    for f in zones['features']:
        geom = f['geometry']
        polys = geom['coordinates'] if geom['type'] == 'MultiPolygon' else [geom['coordinates']]
        for poly in polys:
            ring = np.array(poly[0])
            ax.fill(ring[:, 0], ring[:, 1], color=(1, 1, 1, 0.012), zorder=1)
            ax.plot(ring[:, 0], ring[:, 1], color=(0.55, 0.75, 0.95, 0.10),
                    lw=0.45, zorder=2, solid_capstyle='round')

    colors = cmap(norm)
    order = np.argsort(norm)  # draw high-centrality last (on top)
    segs_sorted = [segs[i] for i in order]
    colors_sorted = colors[order]
    norm_sorted = norm[order]

    # neon glow: wide translucent -> mid -> bright core
    lw_core = 1.1 + norm_sorted * 1.6
    for width_mult, alpha, zorder in [(7.0, 0.05, 3), (3.4, 0.14, 4), (1.0, 1.0, 5)]:
        cols = colors_sorted.copy()
        cols[:, 3] = alpha
        lc = LineCollection(segs_sorted, colors=cols,
                            linewidths=lw_core * width_mult,
                            capstyle='round', zorder=zorder)
        ax.add_collection(lc)

    ax.set_xlim(x0, x1)
    ax.set_ylim(y0, y1)
    ax.set_aspect(aspect)
    ax.axis('off')

    out = OUT + f"\\counts-map-{name}.png"
    fig.savefig(out, facecolor=BG, bbox_inches='tight', pad_inches=0)
    plt.close(fig)
    print('wrote', out)


for name, d in METROS.items():
    render(name, d)
print('done')
