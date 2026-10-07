import type { Block, StatNum } from '../../content/types';
import { useCountUp } from '../../lib/hooks';
import { Label } from '../../lib/Rich';

type Props = Extract<Block, { type: 'numberStrip' }>;

/** Faixa de 4 numeros. `variant="svc"` e a versao preta com borda verde no pe. */
export function NumberStrip({ variant, items }: Props) {
  return (
    <section className={`nums${variant === 'svc' ? ' svc-nums' : ''}`}>
      <div className="wrap nums-in">
        {items.map((n, i) => (
          <div className="num rv" key={i}>
            <Value {...n} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Value({ countTo, value, suffix, label }: StatNum) {
  const ref = useCountUp(countTo);
  return (
    <>
      <p className="num-v">
        {countTo != null ? (
          <span className="cnt" ref={ref}>
            {value}
          </span>
        ) : (
          value
        )}
        {suffix}
      </p>
      <p className="num-l">
        <Label value={label} />
      </p>
    </>
  );
}
