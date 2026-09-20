import CopyButton from './CopyButton'
import StatusBadge from './StatusBadge'
import { playerCount, useServerStatus } from '../utils/serverStatus'

/**
 * Server address at the top of each server's doc page, with the same live
 * status the homepage card shows — so you can keep tabs on a server without
 * going back to the front page. Status and players sit to the left of the copy
 * button. A planned server masks its address; a non-Minecraft server has no
 * status to report and simply shows neither pill.
 *
 * Pack downloads are the instance table's job, so nothing else belongs here.
 */
export default function Address({ server }) {
  const { status, info } = useServerStatus(server)
  const planned = server?.status === 'planned'
  const players = playerCount(status, info)

  return (
    <div className="tw-flex tw-items-center tw-gap-3 tw-flex-wrap tw-my-4">
      <code className="tw-text-lg tw-px-3 tw-py-2">{planned ? '***' : server.address}</code>
      <StatusBadge status={status} />
      {players && (
        <span className="tw-text-sm tw-opacity-70">
          <span className="tw-font-bold">{players}</span> players
        </span>
      )}
      {!planned && <CopyButton text={server.address} className="tw-btn-sm" title="Copy server address" />}
    </div>
  )
}
