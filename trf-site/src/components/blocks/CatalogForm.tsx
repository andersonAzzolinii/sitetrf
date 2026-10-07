import { useState } from 'react';
import type { Span } from '../../content/types';
import { isWorkEmail, sendLead } from '../../lib/leads';
import { Spans } from '../../lib/Rich';
import { Button } from '../primitives/Button';
import { Eyebrow } from '../primitives/Eyebrow';
import { PN } from '../primitives/PN';
import { SITE } from '../../content/site';

interface Props {
  product?: string;
  eyebrow?: string | Span[];
  h2?: Span[];
  id?: string;
  intro?: Span[];
}

/** Pedido de catalogo. Exige e-mail corporativo, como o original. */
export function CatalogForm({ product, eyebrow, h2, id, intro }: Props) {
  const [f, setF] = useState({ name: '', email: '', company: '', website: '' });
  const [err, setErr] = useState('');
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');

    if (!f.name || !f.company || !f.email || !/.+@.+\..+/.test(f.email)) {
      setErr('Please fill in your name, company and a valid work email.');
      return;
    }
    if (!isWorkEmail(f.email)) {
      setErr('Please use your work email.');
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
        company: f.company,
        source: 'catalog-request',
        message: 'Catalog request: ' + (product ?? ''),
        pageUrl: location.href,
      });
      setOk(true);
    } catch {
      setBusy(false);
      setErr(`We could not send your request. Please call ${SITE.phone} or try again.`);
    }
  }

  return (
    <section className="sec roi catalog">
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
            <p className="k-v">Thank you.</p>
            <p className="roi-intro" style={{ margin: '12px 0 0' }}>
              Your catalog is on the way. A <PN /> Sales Engineer may follow up to answer questions
              about your line.
            </p>
          </div>
        ) : (
          <form className="roi-form catalog-form" noValidate onSubmit={onSubmit}>
            <div className="roi-grid">
              <label>
                Name
                <input autoComplete="name" required value={f.name} onChange={set('name')} />
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
                Company
                <input
                  autoComplete="organization"
                  required
                  value={f.company}
                  onChange={set('company')}
                />
                <small className="hint">
                  We use this information to send the catalog and follow up about your project. See
                  our <a href="/privacy-policy/">Privacy Policy</a>.
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
              Send me the catalog
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
