/**
 * UI primitives — the shared vocabulary every screen is built from.
 *
 * Each component is a thin, unopinionated wrapper over a native element: it
 * adds the design-system class names and forwards every other prop through, so
 * `onClick`, `type`, `aria-*`, `ref` etc. all behave exactly as you'd expect.
 *
 * Styles live in ./ui.css, which is imported once from src/index.css.
 */

import Icon from './Icon';

const cx = (...parts) => parts.filter(Boolean).join(' ');

/* -------------------------------------------------------------------------
   Button
   ------------------------------------------------------------------------- */

export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  loading = false,
  fullWidth = false,
  disabled = false,
  className,
  children,
  ...rest
}) {
  const isButton = Tag === 'button';

  return (
    <Tag
      className={cx('btn', `btn--${variant}`, `btn--${size}`, fullWidth && 'btn--block', className)}
      disabled={isButton ? disabled || loading : undefined}
      aria-disabled={!isButton && (disabled || loading) ? true : undefined}
      aria-busy={loading || undefined}
      type={isButton ? rest.type || 'button' : undefined}
      {...rest}
    >
      {loading ? <Spinner size={size === 'lg' ? 20 : 16} /> : icon ? <Icon name={icon} size={size === 'lg' ? 20 : 18} /> : null}
      {children ? <span className="btn__label">{children}</span> : null}
      {iconRight && !loading ? <Icon name={iconRight} size={size === 'lg' ? 20 : 18} /> : null}
    </Tag>
  );
}

/** Square, icon-only button. `label` is required — it becomes the a11y name. */
export function IconButton({ icon, label, variant = 'ghost', size = 'md', className, ...rest }) {
  return (
    <button
      type="button"
      className={cx('icon-btn', `icon-btn--${variant}`, `icon-btn--${size}`, className)}
      aria-label={label}
      title={label}
      {...rest}
    >
      <Icon name={icon} size={size === 'sm' ? 18 : 20} />
    </button>
  );
}

/* -------------------------------------------------------------------------
   Surfaces
   ------------------------------------------------------------------------- */

export function Card({ as: Tag = 'div', interactive = false, padded = true, className, children, ...rest }) {
  return (
    <Tag
      className={cx('card', interactive && 'card--interactive', padded && 'card--padded', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, description, action, align = 'left', className }) {
  return (
    <header className={cx('section-heading', `section-heading--${align}`, className)}>
      <div className="section-heading__text">
        {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
        <h2 className="section-heading__title">{title}</h2>
        {description ? <p className="section-heading__desc">{description}</p> : null}
      </div>
      {action ? <div className="section-heading__action">{action}</div> : null}
    </header>
  );
}

/* -------------------------------------------------------------------------
   Form controls
   ------------------------------------------------------------------------- */

/**
 * Field wires a <label for> to its control and, when `error` is set, points
 * `aria-describedby` at the message so screen readers announce it.
 */
export function Field({ id, label, hint, error, required, children, className }) {
  const describedBy = cx(hint && `${id}-hint`, error && `${id}-error`) || undefined;

  return (
    <div className={cx('field', error && 'field--invalid', className)}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? <span className="field__required" aria-hidden="true"> *</span> : null}
      </label>

      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined, required })}

      {hint && !error ? (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}

      {error ? (
        <p className="field__error" id={`${id}-error`}>
          <Icon name="alert" size={14} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ icon, adornment, className, ...rest }) {
  return (
    <div className={cx('input-wrap', icon && 'input-wrap--icon', adornment && 'input-wrap--adorned')}>
      {icon ? <Icon className="input-wrap__icon" name={icon} size={18} /> : null}
      <input className={cx('input', className)} {...rest} />
      {adornment ? <div className="input-wrap__adornment">{adornment}</div> : null}
    </div>
  );
}

export function Textarea({ className, ...rest }) {
  return <textarea className={cx('input', 'textarea', className)} {...rest} />;
}

/* -------------------------------------------------------------------------
   Feedback + data display
   ------------------------------------------------------------------------- */

export function Badge({ variant = 'neutral', icon, className, children, ...rest }) {
  return (
    <span className={cx('badge', `badge--${variant}`, className)} {...rest}>
      {icon ? <Icon name={icon} size={13} /> : null}
      {children}
    </span>
  );
}

export function Alert({ variant = 'danger', title, className, children, ...rest }) {
  const glyph = { danger: 'alert', success: 'checkCircle', info: 'info', warning: 'alert' }[variant];

  return (
    <div
      className={cx('alert', `alert--${variant}`, className)}
      role={variant === 'danger' ? 'alert' : 'status'}
      {...rest}
    >
      <Icon name={glyph} size={18} className="alert__icon" />
      <div className="alert__body">
        {title ? <p className="alert__title">{title}</p> : null}
        {children ? <p className="alert__text">{children}</p> : null}
      </div>
    </div>
  );
}

export function Progress({ value = 0, label, size = 'md', variant = 'primary', showValue = false }) {
  const pct = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className="progress">
      {(label || showValue) && (
        <div className="progress__meta">
          {label ? <span className="progress__label">{label}</span> : <span />}
          {showValue ? <span className="progress__value">{pct}%</span> : null}
        </div>
      )}
      <div
        className={cx('progress__track', `progress__track--${size}`)}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
      >
        <div className={cx('progress__fill', `progress__fill--${variant}`)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Avatar({ src, name = '', size = 40, className }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  return (
    <span
      className={cx('avatar', className)}
      style={{ '--avatar-size': `${size}px`, fontSize: `${Math.round(size * 0.38)}px` }}
    >
      {src ? (
        <img src={src} alt={name ? `${name}'s avatar` : ''} loading="lazy" width={size} height={size} />
      ) : (
        <span aria-hidden="true">{initials || '?'}</span>
      )}
    </span>
  );
}

export function Spinner({ size = 18, className, label }) {
  return (
    <span
      className={cx('spinner', className)}
      style={{ '--spinner-size': `${size}px` }}
      role={label ? 'status' : undefined}
      aria-hidden={label ? undefined : true}
    >
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}

/** Reserves the exact space the real content will take, so nothing jumps. */
export function Skeleton({ width = '100%', height = 16, radius = 'var(--r-xs)', className, style }) {
  return (
    <span
      className={cx('skeleton', className)}
      style={{ width, height, borderRadius: radius, ...style }}
      aria-hidden="true"
    />
  );
}

export function EmptyState({ icon = 'inbox', title, description, action, className }) {
  return (
    <div className={cx('empty', className)}>
      <span className="empty__icon">
        <Icon name={icon} size={26} />
      </span>
      <h3 className="empty__title">{title}</h3>
      {description ? <p className="empty__desc">{description}</p> : null}
      {action ? <div className="empty__action">{action}</div> : null}
    </div>
  );
}

export { Icon };
