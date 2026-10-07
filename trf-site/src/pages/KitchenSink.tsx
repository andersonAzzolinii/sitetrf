import { ICONS } from '../components/icons/icons';
import { Button } from '../components/primitives/Button';
import { Eyebrow } from '../components/primitives/Eyebrow';
import { GoLink } from '../components/primitives/GoLink';
import { PN } from '../components/primitives/PN';

/**
 * Checkpoint da Fase 1: tudo que o design system produz, em um lugar,
 * sobre fundo claro E escuro. Compare com
 * levantamento-trf/04-assets/icones-svg-inline/_catalogo.html
 */

const CHAMFERS = ['ch-xs', 'ch', 'ch-sm', 'ch-md', 'ch-lg', 'ch-xl'] as const;
const SIZES: Record<string, string> = {
  'ch-xs': '8px',
  ch: '12px (--ch)',
  'ch-sm': '14px',
  'ch-md': '18px',
  'ch-lg': '22px',
  'ch-xl': '26px',
};

function Swatch({ token, hex }: { token: string; hex: string }) {
  return (
    <div style={{ fontFamily: 'var(--display)', fontSize: '.72rem' }}>
      <div
        style={{
          height: 56,
          background: `var(${token})`,
          boxShadow: 'inset 0 0 0 1px rgba(128,128,128,.4)',
        }}
      />
      <div style={{ marginTop: 6, letterSpacing: '.06em' }}>{token}</div>
      <div style={{ opacity: 0.6 }}>{hex}</div>
    </div>
  );
}

export default function KitchenSink() {
  const iconNames = Object.keys(ICONS);

  return (
    <main>
      {/* ── tipografia ─────────────────────────────────────────────────── */}
      <section className="sec light">
        <div className="wrap prose">
          <Eyebrow>Design system</Eyebrow>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.4vw, 4.6rem)',
              lineHeight: 1.02,
              margin: '0 0 18px',
              maxWidth: '14ch',
            }}
          >
            Kitchen sink <span className="lime">TRF</span>
          </h1>
          <h2>
            Escala de titulo h2 com <PN platform="Cobot" /> no meio
          </h2>
          <h3>Titulo h3 em peso 600</h3>
          <p>
            Paragrafo de corpo em Host Grotesk, 1.04rem, com <strong>negrito</strong>, um{' '}
            <a href="#x">link sublinhado</a> e o lockup <PN /> solto no texto — note que o peso cai
            para 400 aqui dentro.
          </p>
          <ul className="checks">
            <li>Item de lista com marcador quadrado chanfrado</li>
            <li>
              Segundo item, com <PN platform="Rapidpack" />
            </li>
          </ul>
          <p className="go-row">
            <GoLink href="#x">Link-CTA com borda verde</GoLink>
          </p>
        </div>
      </section>

      {/* ── cores ──────────────────────────────────────────────────────── */}
      <section className="sec dark">
        <div className="wrap">
          <Eyebrow>Tokens de cor</Eyebrow>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: 14,
              color: '#fff',
            }}
          >
            <Swatch token="--green" hex="#C0FF00" />
            <Swatch token="--white" hex="#EEEEEE" />
            <Swatch token="--grey" hex="#C0C0C0" />
            <Swatch token="--black" hex="#000" />
            <Swatch token="--s950" hex="#050505" />
            <Swatch token="--s900" hex="#0A0A0A" />
            <Swatch token="--s800" hex="#141414" />
            <Swatch token="--s700" hex="#1F1F1F" />
            <Swatch token="--t2" hex="#4A4A4A" />
            <Swatch token="--green-hover" hex="#d4ff4d" />
          </div>
        </div>
      </section>

      {/* ── botoes sobre escuro ────────────────────────────────────────── */}
      <section className="sec dark">
        <div className="wrap">
          <Eyebrow>Botoes sobre escuro</Eyebrow>
          <div className="btns">
            <Button variant="pri" href="#x" arrow>
              Talk with our Sales Engineer
            </Button>
            <Button variant="sec-d" href="#x" arrow>
              Secundario outline
            </Button>
            <Button variant="sec-c" href="#x">
              Sec-c sobre escuro
            </Button>
            <Button variant="pri" href="#x">
              See <PN platform="Cobot" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── botoes sobre claro ─────────────────────────────────────────── */}
      <section className="sec light">
        <div className="wrap">
          <Eyebrow>Botoes sobre claro</Eyebrow>
          <div className="btns">
            <Button variant="pri" href="#x" arrow>
              Primario
            </Button>
            <Button variant="sec-c" href="#x" arrow>
              Secundario claro
            </Button>
            <Button variant="pri" href="#x">
              Com <PN platform="Speed" /> dentro
            </Button>
          </div>
        </div>
      </section>

      {/* ── chanfros ───────────────────────────────────────────────────── */}
      <section className="sec dark">
        <div className="wrap">
          <Eyebrow>Escala de chanfro</Eyebrow>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
              gap: 16,
            }}
          >
            {CHAMFERS.map((c) => (
              <div
                key={c}
                className={c}
                style={{
                  background: 'var(--s900)',
                  border: '1px solid var(--green-soft)',
                  borderTop: '2px solid var(--green)',
                  padding: '26px 20px',
                  color: '#fff',
                  fontFamily: 'var(--display)',
                  fontSize: '.78rem',
                  letterSpacing: '.06em',
                }}
              >
                .{c}
                <div style={{ color: 'var(--grey)', marginTop: 6 }}>{SIZES[c]}</div>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--grey)', fontSize: '.9rem', marginTop: 20 }}>
            Chanfro + sombra precisa de dois elementos: clip-path corta box-shadow. Teste abaixo.
          </p>
          <div style={{ marginTop: 20, display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            <div
              style={{
                filter:
                  'drop-shadow(0 0 16px rgba(192,255,0,.30)) drop-shadow(0 18px 34px rgba(0,0,0,.7))',
              }}
            >
              <div
                className="ch-lg"
                style={{
                  background: 'var(--s950)',
                  border: '1px solid var(--green-soft)',
                  padding: '28px 32px',
                  color: '#fff',
                  fontFamily: 'var(--display)',
                  fontWeight: 700,
                }}
              >
                Glow verde correto
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── icones ─────────────────────────────────────────────────────── */}
      <section className="sec dark">
        <div className="wrap">
          <Eyebrow>{iconNames.length} icones extraidos do original</Eyebrow>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: 14,
            }}
          >
            {iconNames.map((n) => (
              <div
                key={n}
                className="ch-sm"
                style={{
                  background: 'var(--s900)',
                  border: '1px solid var(--line-dark)',
                  padding: 16,
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    width: 44,
                    height: 44,
                    color: 'var(--green)',
                  }}
                >
                  {ICONS[n]}
                </span>
                <div
                  style={{
                    fontSize: '.66rem',
                    color: 'var(--grey)',
                    marginTop: 10,
                    wordBreak: 'break-word',
                    fontFamily: 'var(--display)',
                  }}
                >
                  {n}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── .pn em contexto ────────────────────────────────────────────── */}
      <section className="sec light">
        <div className="wrap prose">
          <Eyebrow>Lockup PN por contexto</Eyebrow>
          <h2>
            Em h2 claro o <PN /> fica preto
          </h2>
          <p>
            Em paragrafo claro: <PN platform="Onepack" /> e <PN platform="Droppack" />.
          </p>
        </div>
      </section>
      <section className="sec dark">
        <div className="wrap prose">
          <h2>
            Em h2 escuro o <PN /> fica verde
          </h2>
          <p>
            Em paragrafo escuro: <PN platform="Intraflow" /> e <PN platform="Cleanflow" />.
          </p>
        </div>
      </section>
    </main>
  );
}
