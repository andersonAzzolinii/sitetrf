/**
 * O lockup de marca do site: "TRF" sempre colado ao nome da plataforma.
 *
 *   <PN />                    -> TRF
 *   <PN platform="Cobot" />   -> TRFCobot
 *
 * No HTML original isto vinha aninhado em duplicata
 * (.pn > b > .pn.pn-alone > b), artefato do gerador. Aqui e um elemento so.
 * O CSS cuida da inversao de cor por contexto (verde sobre escuro, preto
 * sobre claro) e da queda de peso dentro de texto corrido.
 */
export function PN({ platform }: { platform?: string }) {
  if (!platform) {
    return (
      <span className="pn pn-alone">
        <b>TRF</b>
      </span>
    );
  }
  return (
    <span className="pn">
      <b>TRF</b>
      {platform}
    </span>
  );
}
