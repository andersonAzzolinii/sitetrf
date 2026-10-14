import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Motor 3D do tour da fechadora (ASM 10453224).
 *
 * O modelo vem do STEP de engenharia, convertido para GLB (malha simplificada
 * e quantizada, sem decoder externo). Cada malha se chama `g{N}_{i}`, onde N e
 * o subconjunto do STEP — e por esse numero que o tour destaca, abre ou sobe
 * as partes. Unidades em mm, Y para cima, a caixa anda em +X.
 *
 * Carregado so no cliente (import dinamico na pagina), entao nada aqui roda
 * no build SSG.
 */

export interface TourStop {
  /** posicao da camera */
  cam: [number, number, number];
  /** para onde a camera olha */
  look: [number, number, number];
  /** subconjuntos destacados nesta parada */
  focus: number[];
  /** X do centro da caixa nesta parada */
  boxX: number;
}

export interface TourHandle {
  /** indice continuo da parada (0..n-1), vindo do scroll */
  setProgress(f: number): void;
  dispose(): void;
}

interface Options {
  canvas: HTMLCanvasElement;
  modelUrl: string;
  stops: TourStop[];
  onProgress?: (p: number) => void;
  onReady?: () => void;
  onError?: () => void;
  /** posicao da camera em mm, para o HUD */
  onCamera?: (x: number, y: number, z: number) => void;
}

/* subconjuntos do STEP */
const SKIN = new Set([13, 14, 17, 18, 19, 20, 21, 22, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 42, 43, 44]); // portas, tampas, painéis
const LIFT = new Set([2, 4, 5, 6, 7, 8]); // cabeçote de fita e dobradores: sobem com o ajuste de altura
const TUNNEL = new Set([38, 39, 40, 41]); // túneis de entrada e saída: ficam translúcidos com a máquina aberta

const BELT_Y = 806; // topo das esteiras
const BOX = { L: 450, W: 400, H: 330, z: -787 };
const LIFT_DY = BOX.H - 21;
const TAPE_X = 1300; // rolete de entrada do cabeçote
const CENTER = new THREE.Vector3(925, 950, -750);

const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const sstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

type TourMesh = THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;

export function mountTour(opts: Options): TourHandle {
  const { canvas, stops } = opts;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050505);
  scene.fog = new THREE.Fog(0x050505, 7000, 14000);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1a1a, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(3000, 5000, 4000);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xdfe6ff, 0.45);
  rim.position.set(-4000, 1500, -3000);
  scene.add(rim);

  const grid = new THREE.GridHelper(16000, 64, 0x2a2a2a, 0x151515);
  grid.position.set(1500, -160, -750);
  scene.add(grid);

  const camera = new THREE.PerspectiveCamera(38, 1, 10, 40000);
  let narrow = false;
  const resize = () => {
    const w = canvas.clientWidth || innerWidth;
    const h = canvas.clientHeight || innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    narrow = w < 760;
    camera.fov = narrow ? 50 : 38;
    // os cards ocupam a esquerda (desktop) ou a metade de baixo (celular):
    // desloca o enquadramento para o lado livre
    if (w >= 900) camera.setViewOffset(w, h, -w * 0.14, 0, w, h);
    else camera.setViewOffset(w, h, 0, h * 0.24, w, h);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  /* mesas de roletes da linha, antes e depois da maquina (ilustrativas) */
  const rollM = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, metalness: 0.6, roughness: 0.4 });
  const railM = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.4, roughness: 0.6 });
  const rollerTable = (x0: number, x1: number) => {
    const g = new THREE.Group();
    const len = x1 - x0;
    const n = Math.floor(len / 110);
    const rg = new THREE.CylinderGeometry(24, 24, 520, 16);
    rg.rotateX(Math.PI / 2);
    const inst = new THREE.InstancedMesh(rg, rollM, n);
    const m4 = new THREE.Matrix4();
    for (let i = 0; i < n; i++) {
      m4.makeTranslation(x0 + 55 + i * 110, BELT_Y - 24, BOX.z);
      inst.setMatrixAt(i, m4);
    }
    g.add(inst);
    for (const dz of [-290, 290]) {
      const r = new THREE.Mesh(new THREE.BoxGeometry(len, 70, 30), railM);
      r.position.set((x0 + x1) / 2, BELT_Y - 40, BOX.z + dz);
      g.add(r);
      for (const lx of [x0 + 80, x1 - 80]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(40, BELT_Y - 75 + 158, 40), railM);
        leg.position.set(lx, (BELT_Y - 75 - 158) / 2, BOX.z + dz);
        g.add(leg);
      }
    }
    scene.add(g);
  };
  rollerTable(-2300, -860);
  rollerTable(2330, 4100);

  /* caixa de papelao: abas com pivo na borda superior e fita */
  const kraft = new THREE.MeshStandardMaterial({ color: 0xb7895a, roughness: 0.85, metalness: 0 });
  const kraftIn = new THREE.MeshStandardMaterial({ color: 0x9c7146, roughness: 0.9, side: THREE.DoubleSide });
  const tapeM = new THREE.MeshStandardMaterial({ color: 0xc0ff00, roughness: 0.35, metalness: 0.1, emissive: 0x2a3a00 });
  const box = new THREE.Group();
  scene.add(box);
  const body = new THREE.Mesh(new THREE.BoxGeometry(BOX.L, BOX.H, BOX.W), [kraft, kraft, kraftIn, kraft, kraft, kraft]);
  body.position.y = BOX.H / 2;
  box.add(body);
  const flap = (len: number, wid: number, axis: 'x' | 'z', px: number, pz: number, sign: number) => {
    const piv = new THREE.Group();
    piv.position.set(px, BOX.H, pz);
    box.add(piv);
    const m = new THREE.Mesh(new THREE.BoxGeometry(axis === 'x' ? wid : len, 3, axis === 'x' ? len : wid), kraftIn);
    if (axis === 'x') m.position.x = (sign * wid) / 2;
    else m.position.z = (sign * wid) / 2;
    piv.add(m);
    piv.userData.sign = sign;
    return piv;
  };
  const majors = [flap(BOX.L, BOX.W / 2, 'z', 0, BOX.W / 2, -1), flap(BOX.L, BOX.W / 2, 'z', 0, -BOX.W / 2, 1)];
  const minors = [flap(BOX.W - 6, 160, 'x', BOX.L / 2, 0, -1), flap(BOX.W - 6, 160, 'x', -BOX.L / 2, 0, 1)];
  majors.forEach((p) => (p.position.y += 3));
  const tape = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 60), tapeM);
  tape.position.y = BOX.H + 6;
  box.add(tape);
  box.position.set(stops[0].boxX, BELT_Y, BOX.z);
  box.visible = false;

  /* modelo */
  const groups = new Map<number, TourMesh[]>();
  let disposed = false;
  new GLTFLoader().load(
    opts.modelUrl,
    (gltf) => {
      if (disposed) return;
      const root = gltf.scene;
      root.updateMatrixWorld(true);
      root.traverse((o) => {
        if (!(o as THREE.Mesh).isMesh) return;
        const mesh = o as TourMesh;
        const m = mesh.name.match(/g(\d+)_/);
        const gi = m ? +m[1] : -1;
        const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
        mat.side = THREE.DoubleSide;
        if (mat.color.r + mat.color.g + mat.color.b > 2.4) mat.color.multiplyScalar(0.78);
        mat.metalness = Math.min(mat.metalness, 0.45);
        mat.roughness = Math.max(mat.roughness, 0.45);
        mesh.material = mat;
        mesh.userData.gi = gi;
        mesh.userData.base = mesh.position.clone();
        mesh.userData.baseEmissive = mat.emissive.clone();
        if (TUNNEL.has(gi)) mat.transparent = true;
        if (SKIN.has(gi)) {
          // painel sai pelo eixo horizontal dominante, a partir do centro da maquina
          mesh.geometry.computeBoundingBox();
          const c = mesh.geometry.boundingBox!.getCenter(new THREE.Vector3()).applyMatrix4(mesh.matrixWorld);
          const d = c.sub(CENTER);
          d.y = Math.max(d.y, 0) * 0.6;
          if (Math.abs(d.x) > Math.abs(d.z) * 1.2) d.z *= 0.15;
          else if (Math.abs(d.z) > Math.abs(d.x) * 1.2) d.x *= 0.15;
          mesh.userData.dir = d.normalize();
          mat.transparent = true;
        }
        if (!groups.has(gi)) groups.set(gi, []);
        groups.get(gi)!.push(mesh);
      });
      scene.add(root);
      opts.onReady?.();
    },
    (e) => {
      if (e.total) opts.onProgress?.(Math.min(1, e.loaded / e.total));
    },
    () => opts.onError?.(),
  );

  /* loop */
  let target = 0;
  let fs = 0;
  let raf = 0;
  const clock = new THREE.Clock();
  const camP = new THREE.Vector3();
  const camT = new THREE.Vector3();
  const V = (a: [number, number, number]) => new THREE.Vector3(...a);
  const P = stops.map((s) => V(s.cam));
  const T = stops.map((s) => V(s.look));
  const last = stops.length - 1;

  const frame = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
    const time = clock.elapsedTime;
    fs = reduce ? target : fs + (target - fs) * (1 - Math.exp(-dt * 5));
    const i = Math.floor(fs);
    const j = Math.min(last, i + 1);
    const k = ease(fs - i);

    camP.lerpVectors(P[i], P[j], k);
    camT.lerpVectors(T[i], T[j], k);
    const ends = Math.max(0, 1 - fs) + Math.max(0, fs - (last - 1)); // 1 na abertura e no fim
    // no celular a maquina inteira nao cabe no enquadramento das pontas: afasta a camera
    if (narrow) camP.sub(camT).multiplyScalar(1 + 0.55 * ends).add(camT);
    const idle = reduce ? 0 : ends * 260;
    camera.position.set(camP.x + Math.sin(time * 0.18) * idle, camP.y, camP.z + Math.cos(time * 0.18) * idle * 0.5);
    camera.lookAt(camT);
    opts.onCamera?.(camera.position.x, camera.position.y, camera.position.z);

    const open = sstep(0.15, 1, fs) * (1 - sstep(last - 0.8, last, fs));
    const lift = sstep(2.3, 3, fs) * LIFT_DY;
    const bx = stops[i].boxX + (stops[j].boxX - stops[i].boxX) * k;
    box.position.x = bx;
    box.visible = fs > 1.4;
    // abas menores fecham primeiro, depois as maiores
    const cm = sstep(150, 520, bx);
    const cM = sstep(520, 1000, bx);
    minors.forEach((p) => (p.rotation.z = p.userData.sign * (Math.PI / 2 + 0.2) * (1 - cm)));
    majors.forEach((p) => (p.rotation.x = -p.userData.sign * (Math.PI / 2 + 0.35) * (1 - cM)));
    // fita: comeca quando a frente da caixa passa pelo rolete do cabecote
    const tl = Math.min(BOX.L, Math.max(0, bx + BOX.L / 2 - TAPE_X));
    tape.visible = tl > 1;
    tape.scale.x = Math.max(1, tl);
    tape.position.x = BOX.L / 2 - tl / 2;

    const focus = new Set(stops[Math.round(fs)].focus);
    const pulse = 0.5 + 0.5 * Math.sin(time * 3);
    groups.forEach((list, gi) => {
      const foc = focus.has(gi);
      for (const o of list) {
        const mat = o.material;
        if (o.userData.dir) {
          o.position.copy(o.userData.base).addScaledVector(o.userData.dir, open * 900);
          mat.opacity = 1 - open * 0.94;
          o.visible = mat.opacity > 0.03;
          mat.depthWrite = open < 0.5;
        }
        if (TUNNEL.has(gi)) {
          mat.opacity = 1 - open * 0.6;
          mat.depthWrite = open < 0.5;
        }
        if (LIFT.has(gi)) o.position.y = o.userData.base.y + lift;
        if (foc) mat.emissive.setRGB(0.07 + 0.09 * pulse, 0.1 + 0.12 * pulse, 0);
        else mat.emissive.copy(o.userData.baseEmissive);
      }
    });

    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return {
    setProgress(f) {
      target = Math.min(last, Math.max(0, f));
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        mats.forEach((x) => x.dispose());
      });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
