import { useEffect, useState } from 'react';
import type { Span } from '../../content/types';
import { sendLead, hasGpc } from '../../lib/leads';
import { Spans } from '../../lib/Rich';
import { Button } from '../primitives/Button';
import { Eyebrow } from '../primitives/Eyebrow';
import { PN } from '../primitives/PN';
import { SITE } from '../../content/site';

const KINDS = [
  'Do not sell or share my personal information',
  'Access my personal information',
  'Correct my personal information',
  'Delete my personal information',
];

interface Props {
  eyebrow?: string | Span[];
  h2?: Span[];
  id?: string;
  intro?: Span[];
}

/**
 * Pedido de privacidade (CCPA): opt-out, acesso, correcao ou exclusao.
 * O original tambem le navigator.globalPrivacyControl e marca o documento.
 */
export function PrivacyChoices({ eyebrow, h2, id, intro }: Props) {
  const [f, setF] = useState({ name: '', email: '', kind: KINDS[0], details: '', website: '' });
  const [err, setErr] = useState('');
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  /* o sinal GPC do navegador vale como opt-out; o original marca o <html> */
  useEffect(() => {
    if (hasGpc()) document.documentElement.setAttribute('data-gpc', '1');
  }, []);

  const set =
    (k: keyof typeof f) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setF((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');

    if (!f.name || !f.email || !/.+@.+\..+/.test(f.email) || !f.kind) {
      setErr('Please fill in your name, a valid email and the type of request.');
      return;
    }
    if (f.website) {
      setOk(true);
      return;
    }

    setBusy(true);
    try {
      await sendLead({
        email: f.email,
        contactName: f.name,
        source: 'privacy-request',
        message: `${f.kind}${hasGpc() ? ' (GPC signal present)' : ''}${f.details ? `\n${f.details}` : ''}`,
        pageUrl: location.href,
      });
      setOk(true);
    } catch {
      setBusy(false);
      setErr(`We could not send your request. Please call ${SITE.phone} or try again.`);
    }
  }

  return (
    <section className="sec roi" id="privacy-request" aria-labelledby={id}>
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
            <p className="k-v">Request received.</p>
            <p className="roi-intro" style={{ margin: '12px 0 0' }}>
              <PN /> will verify and answer your request within 45 days.
            </p>
          </div>
        ) : (
          <form className="roi-form priv-form" noValidate onSubmit={onSubmit}>
            <div className="roi-grid">
              <label>
                Name
                <input autoComplete="name" required value={f.name} onChange={set('name')} />
              </label>
              <label>
                Email
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={f.email}
                  onChange={set('email')}
                />
              </label>
              <label className="roi-email">
                Type of request
                <select required value={f.kind} onChange={set('kind')}>
                  {KINDS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </label>
              <label className="cf-msg">
                Details (optional)
                <textarea rows={3} value={f.details} onChange={set('details')} />
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
              Send request
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
