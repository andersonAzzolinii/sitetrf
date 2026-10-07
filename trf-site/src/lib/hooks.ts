import { useEffect, useRef, useState } from 'react';

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Header ganha .scrolled depois de 24px — exatamente o threshold do original.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Reveal on scroll. Reproduz o inline-05.js do original:
 *  - IntersectionObserver com rootMargin '0px 0px -8% 0px' e threshold .08
 *  - stagger (i % 4) * 70ms aplicado como transitionDelay inline
 *  - fallback de 2,5s para o caso do observer nao disparar
 *  - respeita prefers-reduced-motion
 *
 * Observa .rv dentro do container (ou no document, se nao passar ref).
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv:not(.in)'));
    if (!els.length) return;

    if (reduced() || !('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    els.forEach((e, i) => {
      e.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
      io.observe(e);
    });

    // rede de seguranca: nada fica invisivel se o observer falhar
    const t = window.setTimeout(() => {
      document.querySelectorAll('.rv').forEach((e) => e.classList.add('in'));
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Contador animado dos numeros. Reproduz o inline-03.js:
 * easing 1-(1-k)^3, 1400ms, toLocaleString('en-US'), dispara a 40% de
 * visibilidade e so uma vez.
 */
export function useCountUp(to: number | undefined, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || to == null || done) return;

    if (reduced() || !('IntersectionObserver' in window)) {
      el.textContent = to.toLocaleString('en-US');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          setDone(true);

          let t0: number | null = null;
          el.textContent = '0';
          const step = (t: number) => {
            if (t0 === null) t0 = t;
            const k = Math.min((t - t0) / duration, 1);
            const v = 1 - Math.pow(1 - k, 3);
            el.textContent = Math.round(to * v).toLocaleString('en-US');
            if (k < 1) requestAnimationFrame(step);
            else el.textContent = to.toLocaleString('en-US');
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, done]);

  return ref;
}
