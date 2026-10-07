import { useMemo, useRef, useState } from 'react';
import { LOCATIONS, US_STATES, BUDGET, MODEL, KW, TIERS } from '../../content/roi-data';
import type { Span } from '../../content/types';
import { isWorkEmail, sendLead, hasGpc } from '../../lib/leads';
import { Spans } from '../../lib/Rich';
import { Eyebrow } from '../primitives/Eyebrow';
import { Button } from '../primitives/Button';
import { PN } from '../primitives/PN';

/* ---- formatacao, igual a do original ----------------------------------- */
const money = (n: number) =>
  (n < 0 ? '-' : '') + '$' + Math.round(Math.abs(n)).toLocaleString('en-US');
const num = (n: number) => Math.round(n).toLocaleString('en-US');

function tierOf(people: number) {
  return TIERS.find((t) => people <= t[0]) ?? TIERS[TIERS.length - 1];
}

interface Props {
  /** plataforma fixa (paginas de produto) ou undefined = usuario escolhe */
  product?: string;
  eyebrow?: string | Span[];
  h2?: Span[];
  id?: string;
  intro?: Span[];
}

/**
 * Calculadora de payback. Porte do inline-11.js do original — mesmas formulas,
 * mesmas tabelas, mesmos textos. O envio e plugavel (ver lib/leads.ts).
 *
 * Metodo (20 anos de vida util):
 *   manY   = pessoas x horas x turnos x dias x 52 x salario
 *   adj    = preco base x multiplicador do tier
 *   sysCost= adj + 5% de adj por 20 anos
 *   robY   = (horas x turnos x dias x 52) x tarifa x 20kW x multiplicador
 *   be     = sysCost / (manY - robY)
 */
export function RoiCalculator({ product, eyebrow, h2, id, intro }: Props) {
  const fixed = !!product;
  const [platform, setPlatform] = useState(product ?? 'TRFCompact');
  const [customPrice, setCustomPrice] = useState('');
  const [state, setState] = useState('');
  const [laborRate, setLaborRate] = useState('');
  const [rateEdited, setRateEdited] = useState(false);
  const [people, setPeople] = useState('2');
  const [hours, setHours] = useState('8');
  const [shifts, setShifts] = useState('1');
  const [days, setDays] = useState('5');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);
  const outRef = useRef<HTMLDivElement>(null);

  const basePrice = platform === 'Custom' ? Number(customPrice) || 0 : (BUDGET[platform] ?? 0);
  const loc = LOCATIONS[state];

  /* o salario sugerido vem da localidade, ate o usuario digitar o dele */
  const effRate = Number(laborRate) || 0;
  const onState = (v: string) => {
    setState(v);
    const d = LOCATIONS[v];
    if (d && !rateEdited) setLaborRate(d[1].toFixed(2));
  };

  const r = useMemo(() => {
    const P = parseInt(people) || 0;
    const H = Number(hours) || 0;
    const S = parseInt(shifts) || 0;
    const D = parseInt(days) || 0;
    if (!loc || effRate <= 0 || !P || !H || !S || !D || basePrice <= 0) return null;

    const t = tierOf(P);
    const manY = P * H * S * D * 52 * effRate;
    const adj = basePrice * t[1];
    const ecph = loc[0] * KW * t[2];
    const useY = H * S * D * 52;
    const sysCost = adj + 0.05 * adj * 20;
    const robY = useY * ecph;
    const rob20 = robY * 20 + sysCost;
    const sav20 = manY * 20 - rob20;
    const net = manY - robY;
    const be = net > 0 ? sysCost / net : 99;
    const effHr = useY * 20 > 0 ? rob20 / (useY * 20) : 0;
    return { P, H, S, D, t, manY, adj, ecph, useY, sysCost, robY, rob20, sav20, net, be, effHr };
  }, [people, hours, shifts, days, loc, effRate, basePrice]);

  const tierPreview = useMemo(() => {
    const P = parseInt(people) || 0;
    if (!P || basePrice <= 0) return null;
    const t = tierOf(P);
    return { price: money(basePrice * t[1]), elec: `${t[2]}x (${t[3]})` };
  }, [people, basePrice]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');

    if (!email || !platform || !state || !effRate) {
      setErr('Please fill in every field and a valid work email.');
      return;
    }
    if (!isWorkEmail(email)) {
      setErr('Please use your work email.');
      return;
    }
    if (!r) {
      setErr(
        'Please select the platform and the location, and fill in the labor and schedule fields.',
      );
      return;
    }
    if (r.H * r.S > 24) {
      setErr('Hours per shift times shifts per day cannot exceed 24.');
      return;
    }

    setSent(true);
    setTimeout(() => outRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);

    if (website) return; // honeypot preenchido: silenciosamente ignora

    try {
      await sendLead({
        email,
        source: 'roi-calculator',
        pageUrl: location.href,
        message: `Payback calculator estimate, ${platform}${hasGpc() ? ' (GPC signal present)' : ''}`,
        roiInputs: {
          platform,
          state,
          laborRate: effRate,
          peoplePerShift: r.P,
          hoursPerShift: r.H,
          shiftsPerDay: r.S,
          daysPerWeek: r.D,
          investment: Math.round(r.adj),
          paybackYears: r.net > 0 ? Math.round(r.be * 100) / 100 : null,
          annualLaborCost: Math.round(r.manY),
          twentyYearSavings: Math.round(r.sav20),
        },
      });
    } catch {
      /* o resultado ja esta na tela; a falha de envio nao o derruba */
    }
  }

  const maxBar = r ? Math.max(r.manY * 20, r.rob20) || 1 : 1;
  const label = product ? <PN platform={product.replace(/^TRF/, '')} /> : 'robotic palletizer';

  return (
    <section className={`sec roi${fixed ? ' roi-fixed' : ''}`} id="roi" aria-labelledby="roi-h">
      <span className="circuit" aria-hidden="true" />
      <div className="wrap">
        <Eyebrow>{eyebrow ?? 'Payback calculator'}</Eyebrow>
        {h2 ? (
          <h2 id={id ?? 'roi-h'}>
            <Spans spans={h2} />
          </h2>
        ) : (
          <h2 id="roi-h">Calculate your {label} payback</h2>
        )}
        <p className="roi-intro">
          {intro ? (
            <Spans spans={intro} />
          ) : (
            <>
              Discover the potential cost savings of a {label} over a 20-year system life. Enter
              your line data to see the preview; your work email unlocks the full breakdown.
            </>
          )}
        </p>

        <form className="roi-form" noValidate onSubmit={onSubmit}>
          <fieldset className="roi-fs">
            <legend>System configuration</legend>
            <div className="roi-grid">
              {!fixed && (
                <label>
                  Which platform are you planning to install?
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                    {Object.keys(BUDGET).map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                    <option value="Custom">Custom (enter your system cost)</option>
                  </select>
                </label>
              )}
              {/* so existe na calculadora completa: no roi-fixed a plataforma e
                  fixa e o campo nem aparece no HTML do original.
                  Sem `hidden`:  venceria o
                  display:none do navegador, e no original ele fica visivel. */}
              {!fixed && (
              <label>
                  Enter base system cost (USD)
                  <input
                    type="number"
                    min="1000"
                    step="any"
                    inputMode="numeric"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                  />
                  <small className="hint">Enter the estimated cost of your robotic system.</small>
                </label>
              )}
              <label>
                Location
                <select value={state} onChange={(e) => onState(e.target.value)} required>
                  <option value="">Select state</option>
                  <optgroup label="United States">
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </label>
            </div>

            {platform && (
              <p className="roi-info">
                <span>
                  Reference list price: <b>{basePrice > 0 ? money(basePrice) : 'Entered below'}</b>
                </span>
                <span>
                  Power draw: <b>{KW} kW</b>
                </span>
                <span className="roi-note">
                  {fixed && MODEL[platform] ? (
                    <>
                      {/* o nome vai como lockup, nao como texto: a fonte display
                          tem metricas proprias e muda a altura da linha */}
                      *<PN platform={platform.replace(/^TRF/, '')} />{' '}
                      {MODEL[platform].replace(platform, '').trim()}, EX Works Lenexa, KS,
                      installation not included. Your quote depends on your application.
                    </>
                  ) : (
                    <>
                      *Reference list price, EX Works Lenexa, KS, installation not included (
                      <PN platform="Cobot" /> Dual, <PN platform="Compact" /> Dual,{' '}
                      <PN platform="Speed" /> 100).
                    </>
                  )}
                </span>
              </p>
            )}

            {/* visivel desde o inicio, com os valores em branco — e o que o
                original faz na pratica */}
            <p className="roi-info">
              <span>
                Electric rate: <b>{loc ? `$${loc[0].toFixed(4)}/kWh` : ''}</b>
              </span>
              <span>
                Average production wage: <b>{loc ? `$${loc[1].toFixed(2)}/hr` : ''}</b>
              </span>
            </p>
          </fieldset>

          <fieldset className="roi-fs">
            <legend>Labor information</legend>
            <div className="roi-grid">
              <label>
                Hourly labor rate per person (USD)
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  inputMode="decimal"
                  required
                  value={laborRate}
                  onFocus={() => setRateEdited(true)}
                  onChange={(e) => setLaborRate(e.target.value)}
                />
                <small className="hint">
                  Auto-filled from location data. Override with your actual rate.
                </small>
              </label>
              <label>
                Number of people per shift currently performing this work
                <input
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                />
                <small className="hint">Count all workers per shift doing this task.</small>
              </label>
            </div>
            {tierPreview && (
              <p className="roi-info">
                <span>
                  Adjusted system price: <b>{tierPreview.price}</b>
                </span>
                <span>
                  Electric multiplier: <b>{tierPreview.elec}</b>
                </span>
              </p>
            )}
          </fieldset>

          <fieldset className="roi-fs">
            <legend>Operating schedule</legend>
            <div className="roi-grid">
              <label>
                Hours per shift
                <input
                  type="number"
                  min="1"
                  max="24"
                  step="0.5"
                  required
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
                <small className="hint">Standard: 8 hours</small>
              </label>
              <label>
                Number of shifts
                <input
                  type="number"
                  min="1"
                  max="4"
                  step="1"
                  required
                  value={shifts}
                  onChange={(e) => setShifts(e.target.value)}
                />
                <small className="hint">Standard: 1 to 3</small>
              </label>
              <label>
                Days per week
                <input
                  type="number"
                  min="1"
                  max="7"
                  step="1"
                  required
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
                <small className="hint">Standard: 5 days</small>
              </label>
            </div>
          </fieldset>

          {/* sempre no DOM, oculto ate ter dados — como o original */}
          <div className="roi-prev" hidden={!r}>
              <p className="roi-prev-h">Quick preview</p>
            <div className="roi-kpis roi-kpis4">
              <Kpi label="Manual labor / year" value={r ? money(r.manY) : ''} />
              <Kpi label="Robot cost / year" value={r ? money(r.robY) : ''} />
              <Kpi
                label="Est. break-even"
                value={r ? (r.be < 20 ? r.be.toFixed(1) + ' years' : '20+ years') : ''}
              />
              <Kpi label="20-year savings" value={r ? money(r.sav20) : ''} />
            </div>
          </div>

          <div className="roi-grid roi-send">
            <label className="roi-email">
              Work email
              <input
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small className="hint">
                Work email only. We use your email and inputs to send this estimate and follow up
                about your project. See our <a href="/privacy-policy/">Privacy Policy</a>.
              </small>
            </label>
            <label className="hp" aria-hidden="true">
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
          </div>

          <Button variant="pri" type="submit" arrow>
            Calculate my ROI
          </Button>
          {err && (
            <p className="roi-err" role="alert">
              {err}
            </p>
          )}
        </form>

        {sent && r && (
          <div className="roi-out" ref={outRef} aria-live="polite">
            <div className="roi-kpis roi-kpis4">
              <Kpi label="Projected 20-year labor savings" value={money(r.sav20)} />
              <Kpi
                label="Break-even point"
                value={r.be < 20 ? r.be.toFixed(1) + ' years' : '20+ years'}
              />
              <Kpi label="Your current hourly labor rate" value={`$${effRate.toFixed(2)}/hr`} />
              <Kpi
                label="Effective hourly cost of the robotic system"
                value={`$${r.effHr.toFixed(2)}/hr`}
              />
            </div>

            <div className="roi-warn" role="note">
              <p className="roi-warn-t">
                This is an initial planning estimate, not a quote and not a guarantee of savings.
              </p>
              <p>
                It does not include many of the costs of a real project, such as installation,
                integration with your line, financing, taxes and layout changes. Your complete
                calculation, with every item for your plant, is done with a <PN /> Sales Engineer.
              </p>
              <Button variant="pri" to="/contact/" arrow>
                Talk with our Sales Engineer
              </Button>
            </div>

            <div className="roi-bars" aria-hidden="true">
              <BarRow
                label="Manual labor, 20 years"
                pct={(r.manY * 20) / maxBar}
                value={money(r.manY * 20)}
              />
              <BarRow label="Robotic system, 20 years" pct={r.rob20 / maxBar} value={money(r.rob20)} green />
            </div>

            <div className="roi-calc">
              <h3>Where the numbers come from</h3>
              <dl>
                <dt>Manual labor</dt>
                <dd>
                  {r.P} people x {r.H} h x {r.S} shifts x {r.D} days x 52 weeks x $
                  {effRate.toFixed(2)}/hr = {money(r.manY)} per year, {money(r.manY * 20)} over 20
                  years
                </dd>
                <dt>System purchase</dt>
                <dd>
                  {money(basePrice)} x {r.t[1]} ({r.t[3]}) = {money(r.adj)}
                </dd>
                <dt>Maintenance</dt>
                <dd>
                  5% x {money(r.adj)} x 20 years = {money(0.05 * r.adj * 20)}
                </dd>
                <dt>Electricity</dt>
                <dd>
                  {num(r.useY)} h x ${loc![0].toFixed(4)}/kWh x {KW} kW x {r.t[2]} = {money(r.robY)}{' '}
                  per year, {money(r.robY * 20)} over 20 years
                </dd>
                <dt>Total system cost</dt>
                <dd>
                  {money(r.adj)} price + {money(0.05 * r.adj * 20)} maintenance = {money(r.sysCost)}
                </dd>
                <dt>Robotic system, 20 years</dt>
                <dd>
                  {money(r.robY * 20)} electricity + {money(r.sysCost)} system = {money(r.rob20)}
                </dd>
                <dt>Break-even</dt>
                <dd>
                  {r.net > 0
                    ? `${money(r.sysCost)} / (${money(r.manY)} - ${money(r.robY)}) = ${r.be.toFixed(2)} years (${Math.round(r.be * 12)} months)`
                    : 'Annual net savings are not positive with these inputs.'}
                </dd>
                <dt>20-year labor savings</dt>
                <dd>
                  {money(r.manY * 20)} manual labor - {money(r.rob20)} robotic system ={' '}
                  {money(r.sav20)}
                </dd>
              </dl>
              <p className="roi-src">
                This calculator compares your current manual labor costs against the total cost of
                owning and operating a robotic system over its 20-year lifespan. The analysis
                includes the system purchase price, maintenance (5% annually), electricity costs,
                and the scale of automation needed based on your workforce size, following the
                method of the A3 (Association for Advancing Automation) Robot System Value
                Calculator. Labor data from the U.S. Bureau of Labor Statistics; electric data from
                the U.S. Energy Information Administration (2024 to 2025). Figures are undiscounted
                and exclude inflation, financing and taxes.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="k-l">{label}</p>
      <p className="k-v">{value}</p>
    </div>
  );
}

function BarRow({
  label,
  pct,
  value,
  green,
}: {
  label: string;
  pct: number;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="bar-row">
      <span>{label}</span>
      <span className="roi-bar">
        <i className={green ? 'g' : undefined} style={{ width: `${pct * 100}%` }} />
      </span>
      <b>{value}</b>
    </div>
  );
}
