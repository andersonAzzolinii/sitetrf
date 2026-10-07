import { useState } from 'react';
import type { Span } from '../../content/types';
import { sendLead } from '../../lib/leads';
import { Spans } from '../../lib/Rich';
import { Button } from '../primitives/Button';
import { Eyebrow } from '../primitives/Eyebrow';
import { PN } from '../primitives/PN';
import { SITE } from '../../content/site';

const SUBJECTS = [
  'Ethics or code of conduct',
  'Corruption, bribery or gifts',
  'Conflict of interest',
  'Discrimination or harassment',
  'Health, safety or working conditions',
  'Information security or data privacy',
  'Environment',
  'Other',
];

interface Props {
  eyebrow?: string | Span[];
  h2?: Span[];
  id?: string;
  intro?: Span[];
}

/**
 * Canal de ombudsman. Nome e e-mail sao opcionais de proposito: o canal
 * aceita denuncia anonima, e so o relato e obrigatorio.
 */
export function OmbudsmanForm({ eyebrow, h2, id, intro }: Props) {
  const [f, setF] = useState({
    subject: SUBJECTS[0],
    name: '',
    email: '',
    message: '',
    website: '',
  });
  const [err, setErr] = useState('');
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  const set =
    (k: keyof typeof f) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setF((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');

    if (!f.message.trim()) {
      setErr('Please describe what happened.');
      return;
    }
    if (f.website) {
      setOk(true);
      return;
    }

    setBusy(true);
    try {
      await sendLead({
        email: f.email || 'anonymous@report.invalid',
        contactName: f.name || 'Anonymous',
        source: 'ombudsman',
        message: `[${f.subject}]\n${f.message}`,
        pageUrl: location.href,
      });
      setOk(true);
    } catch {
      setBusy(false);
      setErr(`We could not send your report. Please call ${SITE.phone} or try again.`);
    }
  }

  return (
    <section className="sec roi omb" id="report" aria-labelledby={id}>
      <span className="circuit" aria-hidden="true" />
      <div className="wrap">
        <Eyebrow>{eyebrow}</Eyebrow>
        {h2 && (
          <h2 id={id}>
            <Spans spans={h2} />
          </h2>
        )}
        {intro && (
          <p className="roi-intro">
            <Spans spans={intro} />
          </p>
        )}

        {ok ? (
          <div className="roi-out cf-ok" aria-live="polite">
            <p className="k-v">Report received.</p>
            <p className="roi-intro" style={{ margin: '12px 0 0' }}>
              The <PN /> Integrity and Ethics Committee will review it. If you left an email, you
              will get a reply.
            </p>
          </div>
        ) : (
          <form className="roi-form omb-form" noValidate onSubmit={onSubmit}>
            <div className="roi-grid">
              <label>
                Subject
                <select value={f.subject} onChange={set('subject')}>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Name (optional)
                <input autoComplete="off" value={f.name} onChange={set('name')} />
              </label>
              <label>
                Email (optional, if you want a reply)
                <input type="email" autoComplete="off" value={f.email} onChange={set('email')} />
              </label>
              <label className="cf-msg">
                What happened? Where, when and who was involved
                <textarea rows={6} required value={f.message} onChange={set('message')} />
                <small className="hint">
                  Do not include personal data of third parties beyond what is needed to review the
                  report. See our <a href="/privacy-policy/">Privacy Policy</a>.
                </small>
              </label>
              <label className="hp" aria-hidden="true">
                Website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={f.website}
                  onChange={set('website')}
                />
              </label>
            </div>
            <Button variant="pri" type="submit" arrow disabled={busy}>
              Send report
            </Button>
            {err && (
              <p className="roi-err" role="alert">
                {err}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
