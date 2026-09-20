import Link from '@docusaurus/Link'
import { clsx } from 'clsx'
import servers from '../data/servers'
import { displayVersion, playerCount, useServerStatus } from '../utils/serverStatus'
import Card from './Card'
import CopyButton from './CopyButton'
import StatusBadge from './StatusBadge'

const MASK = '***'

/**
 * Every card carries the same things in the same places — name, version,
 * status, IP, blurb, players, See more — whether the server is vanilla, runs a
 * pack we build, runs someone else's, or doesn't exist yet. Pack downloads live
 * on the server's own doc page, so one card can't end up taller or busier than
 * the one beside it.
 *
 * A `planned` server keeps its slot in the grid and masks anything it can't
 * honestly report, but still links to its page — the page is where you say what
 * the thing is going to be.
 */
function ServerCard({ server }) {
  const { status, info } = useServerStatus(server)
  const planned = server.status === 'planned'
  const version = displayVersion(server, status, info)
  const players = playerCount(status, info)

  return (
    <Card className={clsx('tw-flex tw-flex-col tw-gap-3', planned && 'tw-opacity-50')}>
      <div className="tw-flex tw-items-center tw-justify-between tw-gap-3">
        <div className="tw-flex tw-items-center tw-gap-2">
          <h3 className="tw-m-0">
            {server.docs ? (
              <Link to={server.docs} className="tw-text-base-content hover:tw-underline">
                {server.name}
              </Link>
            ) : (
              server.name
            )}
          </h3>
          {version && <span className="tw-badge tw-badge-ghost">{version}</span>}
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="tw-flex tw-items-center tw-gap-1">
        IP: <code className="tw-pl-2 tw-pr-2 tw-text-sm">{planned ? MASK : server.address}</code>
        {!planned && (
          <CopyButton className="tw-btn-xs tw-font-mono" text={server.address} title="Copy server address" />
        )}
      </div>

      <p className="tw-m-0 tw-flex-1">{server.description}</p>

      <div className="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-flex-wrap">
        <div
          className={clsx(
            'tw-flex tw-gap-6 tw-text-sm tw-font-medium tw-transition-opacity',
            planned || players ? 'tw-opacity-100' : 'tw-opacity-0',
          )}
        >
          <span>
            <span className="tw-font-bold">{planned ? MASK : players || '—'}</span> players
          </span>
        </div>
        <div className="tw-flex tw-items-center tw-gap-3">
          {server.docs && (
            <Link to={server.docs} className="tw-text-sm tw-underline dark:tw-no-underline tw-whitespace-nowrap">
              See more
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}

export default function ServerStatus({ stacked = false }) {
  return (
    <div
      className={clsx(
        'tw-grid tw-gap-4 tw-mx-auto',
        !stacked && 'tw-gap-8',
        !stacked && (servers.length === 1 ? 'tw-max-w-[560px]' : 'lg:tw-grid-cols-2'),
      )}
    >
      {servers.map((server) => (
        <ServerCard key={server.id} server={server} />
      ))}
    </div>
  )
}
