import { useState } from 'react';
import { sendLead } from '../../lib/leads';
import { Button } from '../primitives/Button';
import { PN } from '../primitives/PN';
import { SITE } from '../../content/site';

const NEEDS = [
  'Robotic palletizing',
  'Case packing',
  'Conveyor systems',
  'Complete end of line (packing, conveying and palletizing)',
  'Parts and service for TRF equipment',
  'Something else',
];

const TIMELINES = ['Within 3 months', '3 to 6 months', '6 to 12 months', 'Just researching'];

/** Formulario de contato. Mesmos campos e textos do original. */
export function ContactForm() {
  const [f, setF] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    role: '',
    need: '',
    speed: '',
    timeline: '',
    message: '',
    website: '',
  });
  const [err, setErr] = useState('');
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');

    if (!f.name || !f.company || !f.email || !/.+@.+\..+/.test(f.email) || !f.need) {
      setErr('Please fill in your name, company, a valid email and what you need to automate.');
      return;
    }
    if (f.website) {
      setOk(true); // honeypot: finge sucesso
      return;
    }

    const message =
      `Needs: ${f.need}` +
      (f.speed ? ` | Line speed: ${f.speed}` : '') +
      (f.timeline ? ` | Timeline: ${f.timeline}` : '') +
      (f.role ? ` | Role: ${f.role}` : '') +
      (f.message ? `\n${f.message}` : '');

    setBusy(true);
    try {
      await sendLead({
        email: f.email,
        contactName: f.name,
        company: f.company,
        phone: f.phone,
        message,
        source: 'contact-form',
        pageUrl: location.href,
      });
      setOk(true);
    } catch {
      setBusy(false);
      setErr(`We could not send your message. Please call ${SITE.phone} or try again.`);
    }
  }

  if (ok) {
    return (
      <section className="sec roi contact-sec" id="contact-form" aria-label="Contact form">
        <span className="circuit" aria-hidden="true" />
        <div className="wrap">
          <div className="roi-out cf-ok" aria-live="polite">
            <p className="k-v">Thank you.</p>
            <p className="roi-intro" style={{ margin: '12px 0 0' }}>
              A <PN /> Sales Engineer will contact you shortly to schedule a conversation about your
              line. If you prefer to talk now, call <a href={SITE.phoneHref}>{SITE.phone}</a>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="sec roi contact-sec" id="contact-form" aria-label="Contact form">
      <span className="circuit" aria-hidden="true" />
      <div className="wrap">
        <form className="roi-form contact-form" noValidate onSubmit={onSubmit}>
          <div className="roi-grid">
            <label>
              Name
              <input autoComplete="name" required value={f.name} onChange={set('name')} />
            </label>
            <label>
              Company
              <input autoComplete="organization" required value={f.company} onChange={set('company')} />
            </label>
            <label>
              Work email
              <input
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
                value={f.email}
                onChange={set('email')}
              />
            </label>
            <label>
              Phone
              <input type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} />
            </label>
            <label>
              Your role
              <input
                autoComplete="organization-title"
                placeholder="Plant manager, engineering, procurement..."
                value={f.role}
                onChange={set('role')}
              />
            </label>
            <label>
              What do you need to automate?
              <select required value={f.need} onChange={set('need')}>
                <option value="">Select</option>
                {NEEDS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Line speed today
              <input
                placeholder="e.g. 12 cases per minute, 2 shifts"
                value={f.speed}
                onChange={set('speed')}
              />
            </label>
            <label>
              When do you plan to decide?
              <select value={f.timeline} onChange={set('timeline')}>
                <option value="">Select</option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="cf-msg">
              Tell us about the product, the case and the layout
              <textarea
                rows={4}
                placeholder="Products, case weights, pallet pattern, floor space..."
                value={f.message}
                onChange={set('message')}
              />
              <small className="hint">
                We use this information to answer your request and follow up about your project. See
                our <a href="/privacy-policy/">Privacy Policy</a>.
              </small>
            </label>
            <label className="hp" aria-hidden="true">
              Website
              <input tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} />
            </label>
          </div>

          <Button variant="pri" type="submit" arrow disabled={busy}>
            Send to a Sales Engineer
          </Button>
          {err && (
            <p className="roi-err" role="alert">
              {err}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
