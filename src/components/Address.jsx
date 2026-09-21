import CopyButton from './CopyButton'

/**
 * Server address at the top of each server's doc page: the address and a copy
 * button, nothing else. A planned server masks its address.
 *
 * No live status here — the site doesn't ping servers (see utils/serverStatus).
 * Pack downloads are the instance table's job, so nothing else belongs here.
 */
export default function Address({ server }) {
  const planned = server?.status === 'planned'

  return (
    <div className="tw-flex tw-items-center tw-gap-3 tw-flex-wrap tw-my-4">
      <code className="tw-text-lg tw-px-3 tw-py-2">{planned ? '***' : server.address}</code>
      {!planned && <CopyButton text={server.address} className="tw-btn-sm" title="Copy server address" />}
    </div>
  )
}
