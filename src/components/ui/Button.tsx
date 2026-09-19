import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

interface CommonProps {
  variant?: Variant
  size?: Size
  /** Icône affichée avant/après le libellé. */
  iconStart?: ReactNode
  iconEnd?: ReactNode
  className?: string
  children: ReactNode
}

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string }
type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }

export type ButtonProps = AnchorProps | NativeButtonProps

const base =
  'group inline-flex select-none items-center justify-center gap-2 rounded-full font-medium tracking-tight ' +
  'transition-[background-color,border-color,box-shadow,color,transform] duration-300 ease-out-expo ' +
  'motion-safe:active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-electric-600 text-white shadow-[0_8px_30px_-8px_rgb(22_119_255/0.7)] ' +
    'hover:bg-electric hover:shadow-[0_10px_36px_-6px_rgb(0_217_255/0.5)]',
  secondary:
    'border border-line-strong bg-white/[0.03] text-ink hover:border-cyan/60 hover:bg-cyan/[0.06] hover:text-white',
  ghost: 'text-ink-muted hover:text-white',
}

const sizes: Record<Size, string> = {
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-7 text-[0.9375rem]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {iconStart}
      <span>{children}</span>
      {iconEnd}
    </>
  )

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...anchorProps}
      >
        {content}
      </a>
    )
  }

  const { href: _href, type = 'button', ...buttonProps } = rest
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  )
}
