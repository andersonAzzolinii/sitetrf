import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/primitives/Button';
import { Seo } from '../lib/Seo';
import type { Page } from '../content/types';
import type { TourHandle, TourStop } from '../lib/machineTour';

/**
 * /machine-tour/ — passeio 3D guiado pelo scroll pela fechadora de caixas
 * ASM 10453224, a partir do STEP de engenharia.
 *
 * O texto (cards) sai no HTML do SSG; o three.js e o modelo so carregam no
 * cliente, por import dinamico. Cada <section data-stop> e uma parada; o
 * scroll vira um indice continuo entre elas e o motor interpola a camera.
 */

const PAGE: Page = {
  route: '/machine-tour/',
  title: 'Case Sealer 3D Tour | TRF Automation',
  description:
    'Scroll through a TRF case sealer in 3D, from infeed to discharge, built straight from the engineering model.',
  ogImage: '',
  blocks: [],
};

const MODEL_URL = '/assets/media/machine-10453224.glb';

interface Stop extends TourStop {
  label: string;
  code?: string;
  kicker: string;
  title: string;
  text: string;
  facts?: [string, string][];
}

/* camera/alvo em mm; `focus` = subconjuntos do STEP; `boxX` = onde a caixa esta */
const STOPS: Stop[] = [
  {
    label: 'Overview', kicker: 'Case sealer · SMC', title: '', text: '',
    cam: [4600, 2900, 4300], look: [1300, 800, -750], focus: [], boxX: -1650,
  },
  {
    label: 'Frame', code: '10453225', kicker: 'Primary frame',
    title: 'Doors off',
    text: 'Panels, doors and the top cover slide away to show the steel profile frame. Everything inside hangs on it, levelled by four adjustable feet.',
    facts: [['Frame height', '1,902 mm'], ['Height with stack light', '2,267 mm']],
    cam: [3300, 2700, 3100], look: [925, 900, -750], focus: [], boxX: -1650,
  },
  {
    label: 'Infeed', code: '10453445', kicker: 'Infeed',
    title: 'The case arrives open',
    text: 'The case comes down the line already erected, top flaps open, and enters through a guard tunnel that keeps hands away from moving parts.',
    cam: [-2700, 1900, 1150], look: [-750, 950, -780], focus: [40, 41], boxX: -1300,
  },
  {
    label: 'Height', code: '10485984', kicker: 'Height adjustment',
    title: 'The head drops to the case',
    text: 'A handwheel on top moves the upper assembly vertically to match the case height. Tape head and flap folders travel together.',
    cam: [-1500, 2300, 700], look: [400, 1300, -700], focus: [3, 9, 10], boxX: -230,
  },
  {
    label: 'Drive', code: '10453464', kicker: 'Drive belts',
    title: 'Two belts pull the case through',
    text: 'Two green belts run the full length of the cabinet on a gearmotor, carrying the case at constant speed without letting it twist.',
    facts: [['Belt run', '1,820 mm']],
    cam: [-1450, 2350, -785], look: [700, 800, -785], focus: [1], boxX: 320,
  },
  {
    label: 'Flaps', code: '10485944', kicker: 'SMC pneumatics',
    title: 'Flaps fold down',
    text: 'SMC cylinders and folding rails close the minor flaps first, then the major flaps, while the case keeps moving.',
    cam: [150, 1900, 900], look: [750, 1150, -785], focus: [4, 5, 6, 7, 8], boxX: 760,
  },
  {
    label: 'Guides', code: '10453345', kicker: 'Side guides',
    title: 'Centred before the tape',
    text: 'Pairs of side rollers hold the case walls on the centreline so the tape lands exactly on the flap seam.',
    cam: [1650, 2350, 500], look: [1180, 880, -785], focus: [16], boxX: 1150,
  },
  {
    label: 'Tape', code: '10486003', kicker: 'Tape head',
    title: 'Taped in a single pass',
    text: 'The front roller sticks the tape to the leading face, the case drags it across the top and the knife cuts at the end, wiping the tail down the trailing face.',
    cam: [1250, 1650, 750], look: [1500, 1250, -790], focus: [2], boxX: 1560,
  },
  {
    label: 'Panel', code: '10453649', kicker: 'Control panel',
    title: 'Power and air in one place',
    text: 'The front side carries the electrical cabinet and the air prep unit with filter-regulator. The e-stop sits on the column next to it.',
    cam: [480, 800, 1650], look: [430, 380, -60], focus: [11], boxX: 2150,
  },
  {
    label: 'Discharge', code: '10453431', kicker: 'Discharge',
    title: 'Sealed and ready to palletize',
    text: 'The case leaves sealed through the discharge tunnel and moves on to the next step of the line, manual or robotic palletizing.',
    cam: [3900, 2100, 1700], look: [2700, 950, -780], focus: [38, 39], boxX: 2750,
  },
  {
    label: 'Contact', kicker: 'End of the line', title: '', text: '',
    cam: [-2600, 2600, 3600], look: [1300, 800, -750], focus: [], boxX: 3350,
  },
];

const n2 = (i: number) => String(i).padStart(2, '0');
const fmt = (v: number) => Math.round(v).toLocaleString('en-US');

export default function MachineTour() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tourRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState<{ p: number; state: 'loading' | 'ready' | 'error' }>({ p: 0, state: 'loading' });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const tour = tourRef.current;
    if (!canvas || !tour) return;
    let handle: TourHandle | null = null;
    let cancelled = false;
    const sections = Array.from(tour.querySelectorAll<HTMLElement>('section[data-stop]'));

    /* centro da viewport -> indice continuo entre os centros das secoes */
    const indexFromScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.5;
      const anchors = sections.map((s) => s.getBoundingClientRect().top + window.scrollY + s.offsetHeight * 0.5);
      const last = anchors.length - 1;
      if (mid <= anchors[0]) return 0;
      if (mid >= anchors[last]) return last;
      for (let i = 0; i < last; i++) {
        if (mid < anchors[i + 1]) return i + (mid - anchors[i]) / (anchors[i + 1] - anchors[i]);
      }
      return last;
    };
    const onScroll = () => {
      const f = indexFromScroll();
      handle?.setProgress(f);
      setActive(Math.round(f));
    };

    import('../lib/machineTour').then(({ mountTour }) => {
      if (cancelled) return;
      handle = mountTour({
        canvas,
        modelUrl: MODEL_URL,
        stops: STOPS,
        onProgress: (p) => setLoad({ p, state: 'loading' }),
        onReady: () => setLoad({ p: 1, state: 'ready' }),
        onError: () => setLoad({ p: 0, state: 'error' }),
        onCamera: (x, y, z) => {
          const el = hudRef.current;
          const b = el?.querySelectorAll('b');
          if (b && b.length === 3) {
            b[0].textContent = fmt(x);
            b[1].textContent = fmt(y);
            b[2].textContent = fmt(z);
          }
        },
      });
      onScroll();
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelled = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      handle?.dispose();
    };
  }, []);

  const goTo = (i: number) => {
    const s = tourRef.current?.querySelectorAll<HTMLElement>('section[data-stop]')[i];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    s?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  };

  const last = STOPS.length - 1;

  return (
    <main className="mt">
      <Seo page={PAGE} />
      <div className="mt-stage" aria-hidden="true">
        <canvas ref={canvasRef} />
        <div className="mt-vignette" />
      </div>

      <div className="mt-ui">
        <nav className="mt-rail" aria-label="Tour stops">
          {STOPS.map((s, i) => (
            <button
              type="button"
              key={s.label}
              className={i === active ? 'on' : undefined}
              aria-current={i === active ? 'step' : undefined}
              onClick={() => goTo(i)}
            >
              <span>{s.label}</span>
              <i>{n2(i)}</i>
            </button>
          ))}
        </nav>

        <div className="mt-hud" ref={hudRef} aria-hidden="true">
          <span>X <b>0</b></span><span>Y <b>0</b></span><span>Z <b>0</b></span><span>mm</span>
        </div>

        {load.state !== 'ready' && (
          <div className="mt-loader" role="status">
            {load.state === 'error' ? (
              <span className="mt-err">Could not load the 3D model. Reload the page to try again.</span>
            ) : (
              <>
                <span>Loading 3D model… {Math.round(load.p * 100)}%</span>
                <div><i style={{ width: `${load.p * 100}%` }} /></div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-tour" ref={tourRef}>
        {/* 00 — abertura */}
        <section className="mt-stop mt-open" data-stop={0}>
          <div className="mt-hero">
            <p className="mt-kicker"><b>00</b> Case sealer · ASM 10453224</p>
            <h1>
              Step inside the machine. <span className="lime">Follow the case.</span>
            </h1>
            <p className="mt-lead">
              Scroll to travel through a TRF case sealer from infeed to discharge, assembly by assembly,
              straight from the engineering model.
            </p>
            <dl className="mt-specs">
              <div><dt>overall length with conveyors</dt><dd>4,770<small>mm</small></dd></div>
              <div><dt>cabinet footprint, mm</dt><dd>1,850<small>×1,500</small></dd></div>
              <div><dt>distinct parts in the model</dt><dd>556</dd></div>
            </dl>
            <p className="mt-hint">Scroll to start</p>
          </div>
        </section>

        {STOPS.slice(1, last).map((s, idx) => {
          const i = idx + 1;
          return (
            <section className="mt-stop" data-stop={i} key={s.label}>
              <article className="mt-card">
                <p className="mt-kicker">
                  <b>{n2(i)}</b> {s.kicker}
                  {s.code && <> · {s.code}</>}
                </p>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
                {s.facts && (
                  <ul className="mt-facts">
                    {s.facts.map(([k, v]) => (
                      <li key={k}><span>{k}</span><b>{v}</b></li>
                    ))}
                  </ul>
                )}
              </article>
            </section>
          );
        })}

        {/* fim — CTA */}
        <section className="mt-stop" data-stop={last}>
          <article className="mt-card">
            <p className="mt-kicker"><b>{n2(last)}</b> End of the line</p>
            <h2>Want this machine on your line?</h2>
            <p>TRF designs and integrates complete end-of-line systems: case erecting, sealing, palletizing and conveyors.</p>
            <div className="btns">
              <Button variant="pri" to="/contact/" arrow>Talk with our Sales Engineer</Button>
              <Button variant="sec-d" to="/case-packing/" arrow>See case packing</Button>
            </div>
          </article>
        </section>
      </div>

    </main>
  );
}
