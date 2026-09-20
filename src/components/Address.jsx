import CopyButton from './CopyButton'

/**
 * Server address with a copy button, at the top of each server's doc page.
 * Pack downloads are the instance table's job, so nothing else belongs here.
 */
export default function Address({ address }) {
  return (
    <div className="tw-flex tw-items-center tw-gap-3 tw-my-4">
      <code className="tw-text-lg tw-px-3 tw-py-2">{address}</code>
      <CopyButton text={address} className="tw-btn-sm" title="Copy server address" />
    </div>
  )
}
