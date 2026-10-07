import type { Block, StatNum } from '../../content/types';
import { Spans, Label } from '../../lib/Rich';
import { useCountUp } from '../../lib/hooks';

type Props = Extract<Block, { type: 'homeTitle' }>;

export function HomeTitle({ h1, nums }: Props) {
  return (
    <section className="home-title">
      <div className="wrap">
        <h1 className="home-h1 rv">
          <Spans spans={h1} />
        </h1>
        <ul className="home-nums" aria-label="TRF in numbers">
          {nums.map((n, i) => (
            <li className="home-num rv" key={i}>
              <Num {...n} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Num({ countTo, value, suffix, label }: StatNum) {
  const ref = useCountUp(countTo);
  return (
    <>
      <p className="home-num-v">
        {countTo != null ? (
          <span className="cnt" ref={ref}>
            {value}
          </span>
        ) : (
          value
        )}
        {suffix}
      </p>
      <p className="home-num-l">
        <Label value={label} />
      </p>
    </>
  );
}
