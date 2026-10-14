import sys, json, time, collections
import numpy as np
from OCP.STEPCAFControl import STEPCAFControl_Reader
from OCP.TDocStd import TDocStd_Document
from OCP.TCollection import TCollection_ExtendedString
from OCP.XCAFDoc import XCAFDoc_DocumentTool, XCAFDoc_ColorType
from OCP.TDF import TDF_Label
from OCP.collections import Sequence_TDF_Label as TDF_LabelSequence
from OCP.TDataStd import TDataStd_Name
from OCP.Quantity import Quantity_Color
from OCP.TopLoc import TopLoc_Location
from OCP.BRepMesh import BRepMesh_IncrementalMesh
from OCP.TopExp import TopExp_Explorer
from OCP.TopAbs import TopAbs_FACE, TopAbs_REVERSED
from OCP.BRep import BRep_Tool
from OCP.TopoDS import TopoDS
from OCP.IFSelect import IFSelect_RetDone
from OCP.Bnd import Bnd_Box
from OCP.BRepBndLib import BRepBndLib

src, out_json = sys.argv[1], sys.argv[2]
LIN = float(sys.argv[3]) if len(sys.argv) > 3 else 1.5
t0 = time.time()
doc = TDocStd_Document(TCollection_ExtendedString("XmlOcaf"))
r = STEPCAFControl_Reader()
r.SetColorMode(True); r.SetNameMode(True)
assert r.ReadFile(src) == IFSelect_RetDone
r.Transfer(doc)
print("read", time.time() - t0, flush=True)
st = XCAFDoc_DocumentTool.ShapeTool_s(doc.Main())
ct = XCAFDoc_DocumentTool.ColorTool_s(doc.Main())

def name(lab):
    n = TDataStd_Name()
    if lab.FindAttribute(TDataStd_Name.GetID_s(), n):
        return n.Get().ToExtString()
    return ""

def color(lab, shape=None):
    c = Quantity_Color()
    for t in (XCAFDoc_ColorType.XCAFDoc_ColorSurf, XCAFDoc_ColorType.XCAFDoc_ColorGen):
        if ct.GetColor_s(lab, t, c):
            return (c.Red(), c.Green(), c.Blue())
        if shape is not None and ct.GetColor(shape, t, c):
            return (c.Red(), c.Green(), c.Blue())
    return None

leaves = []  # (path names, shape located, color)
def walk(lab, loc, path, col):
    ref = TDF_Label()
    if st.IsReference_s(lab):
        st.GetReferredShape_s(lab, ref)
        l2 = loc.Multiplied(st.GetLocation_s(lab))
        c2 = color(lab) or col
        walk(ref, l2, path + [name(ref) or name(lab)], color(ref) or c2)
        return
    if st.IsAssembly_s(lab):
        seq = TDF_LabelSequence(); st.GetComponents_s(lab, seq, False)
        for i in range(1, seq.Length() + 1):
            walk(seq.Value(i), loc, path, col)
        return
    shp = st.GetShape_s(lab)
    # sub-shape colors
    subs = TDF_LabelSequence(); st.GetSubShapes_s(lab, subs)
    facecol = {}
    for i in range(1, subs.Length() + 1):
        sl = subs.Value(i); c = color(sl)
        if c:
            ex = TopExp_Explorer(st.GetShape_s(sl), TopAbs_FACE)
            while ex.More():
                facecol[hash(ex.Current())] = c
                ex.Next()
    leaves.append((path, shp, loc, color(lab, shp) or col, facecol))

roots = TDF_LabelSequence(); st.GetFreeShapes(roots)
for i in range(1, roots.Length() + 1):
    walk(roots.Value(i), TopLoc_Location(), [name(roots.Value(i))], None)
print("leaves", len(leaves), time.time() - t0, flush=True)

# mesh each unique prototype shape once
meshed = set()
groups = collections.defaultdict(lambda: {"v": [], "f": [], "n": 0})
def key(c):
    if c is None: c = (0.62, 0.64, 0.66)
    return tuple(round(x, 2) for x in c)

def hkey(s):
    return hash(s)

for idx, (path, shp, loc, col, facecol) in enumerate(leaves):
    tid = id(shp.TShape()) if False else hkey(shp.Located(TopLoc_Location()))
    if tid not in meshed:
        BRepMesh_IncrementalMesh(shp, LIN, False, 0.5, True)
        meshed.add(tid)
    trsf = loc.Transformation()
    grp = '/'.join(path[1:3]) if len(path)>2 and ('ESTRUTURA' in path[1] or 'CONFIG' in path[1]) else (path[1] if len(path)>1 else path[0])
    if 'CONFIG' in grp and len(path)>3: grp='/'.join(path[1:4])
    ex = TopExp_Explorer(shp, TopAbs_FACE)
    while ex.More():
        face = TopoDS.Face(ex.Current())
        fl = TopLoc_Location()
        tri = BRep_Tool.Triangulation_s(face, fl)
        if tri is not None:
            c = facecol.get(hkey(face), col)
            g = groups[(grp, key(c))]
            T = trsf.Multiplied(fl.Transformation())
            nb = tri.NbNodes()
            pts = np.empty((nb, 3))
            for k in range(1, nb + 1):
                p = tri.Node(k).Transformed(T); pts[k-1] = (p.X(), p.Y(), p.Z())
            ft = np.empty((tri.NbTriangles(), 3), dtype=np.int64)
            for k in range(1, tri.NbTriangles() + 1):
                a, b, cc = tri.Triangle(k).Get()
                ft[k-1] = (a, b, cc) if face.Orientation() != TopAbs_REVERSED else (a, cc, b)
            ft -= 1
            # location mirror flips winding
            if T.IsNegative(): ft = ft[:, [0, 2, 1]]
            g["f"].append(ft + g["n"]); g["v"].append(pts); g["n"] += nb
        ex.Next()
    if idx % 50 == 0: print(idx, time.time() - t0, flush=True)

import trimesh
scene = trimesh.Scene()
meta = collections.defaultdict(lambda: {"tris": 0, "min": [1e18]*3, "max": [-1e18]*3})
for (grp, c), g in groups.items():
    if not g["v"]: continue
    V = np.vstack(g["v"]); F = np.vstack(g["f"])
    m = trimesh.Trimesh(V, F, process=False)
    m.merge_vertices()
    m.visual = trimesh.visual.ColorVisuals(m, face_colors=None)
    mat = trimesh.visual.material.PBRMaterial(baseColorFactor=[c[0], c[1], c[2], 1.0], metallicFactor=0.35, roughnessFactor=0.55)
    m.visual = trimesh.visual.TextureVisuals(material=mat)
    gi = list(dict.fromkeys(k for k, _ in groups.keys())).index(grp)
    scene.add_geometry(m, node_name=f"g{gi}_{len(scene.geometry)}", geom_name=f"g{gi}_{len(scene.geometry)}")
    mm = meta[grp]; mm["tris"] += len(F); mm["gi"] = gi
    mm["min"] = np.minimum(mm["min"], V.min(0)).tolist(); mm["max"] = np.maximum(mm["max"], V.max(0)).tolist()
scene.export(out_json.replace('.json', '.glb'))
json.dump({k: v for k, v in meta.items()}, open(out_json, "w"), indent=1, ensure_ascii=False)
print("done", time.time() - t0)
