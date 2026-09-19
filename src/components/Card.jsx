import { clsx } from 'clsx'

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx('tw-p-6 tw-border tw-border-solid tw-border-base-300 tw-bg-base-100 tw-rounded-2xl', className)}
      {...props}
    >
      {children}
    </div>
  )
}
