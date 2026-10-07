import { Button } from '../components/primitives/Button';
import { Eyebrow } from '../components/primitives/Eyebrow';

export default function NotFound() {
  return (
    <main>
      <section className="hero hero-compact">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-radial" aria-hidden="true" />
        <div className="wrap hero-in">
          <Eyebrow>Error 404</Eyebrow>
          <h1>
            This page is not <span className="lime">on the line.</span>
          </h1>
          <p className="lead">
            The page you asked for does not exist or was moved. Start from the solutions or talk to
            a Sales Engineer.
          </p>
          <div className="btns">
            <Button variant="pri" to="/" arrow>
              Back to home
            </Button>
            <Button variant="sec-d" to="/contact/" arrow>
              Talk with our Sales Engineer
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
