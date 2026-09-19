import { clsx } from 'clsx'
import { useState } from 'react'

/** Copies `text` to the clipboard and confirms for two seconds. */
export default function CopyButton({ text, label = 'Copy', title, className }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      className={clsx('tw-btn tw-normal-case', className)}
      title={title}
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
      }}
    >
      {copied ? 'Copied ✓' : label}
    </button>
  )
}
