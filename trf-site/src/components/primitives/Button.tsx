import { Link } from 'react-router-dom';
import type { Span } from '../../content/types';
import { Arrow } from './Arrow';
import { Label } from '../../lib/Rich';

type Variant = 'pri' | 'sec-d' | 'sec-c';

interface Props {
  variant?: Variant;
  to?: string;
  href?: string;
  children: React.ReactNode | Span[];
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

/**
 * Botao / CTA. `to` usa o router; `href` e link externo; sem os dois, vira <button>.
 * Todos chanfrados em 12px, uppercase, fonte display.
 */
export function Button({
  variant = 'pri',
  to,
  href,
  children,
  arrow = false,
  className = '',
  onClick,
  type = 'button',
  disabled,
}: Props) {
  const cls = `btn ${variant} ${className}`.trim();
  const label = Array.isArray(children) ? <Label value={children as Span[]} /> : children;
  const inner = (
    <>
      {label}
      {arrow && <Arrow />}
    </>
  );

  if (to) {
    return (
      <Link className={cls} to={to} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        className={cls}
        href={href}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}
