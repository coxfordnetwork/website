import Link from '@docusaurus/Link'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import servers from '../data/servers'
import Card from './Card'
import CopyButton from './CopyButton'

const MASK = '***'

function StatusBadge({ status }) {
  if (status === 'planned') {
    return <span className="tw-badge tw-badge-outline tw-gap-2">Planned</span>
  }

  if (status === 'loading') {
    return <span className="tw-badge tw-badge-ghost tw-gap-2">Checking…</span>
  }

  if (status === 'online') {
    return (
      <span className="tw-badge tw-badge-primary tw-gap-2">
        <span className="tw-relative tw-flex tw-h-2 tw-w-2">
          <span className="tw-animate-ping tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-primary-content tw-opacity-75" />
          <span className="tw-relative tw-inline-flex tw-rounded-full tw-h-2 tw-w-2 tw-bg-primary-content" />
        </span>
        Online
      </span>
    )
  }

  return <span className="tw-badge tw-badge-outline tw-gap-2 tw-opacity-70">Offline</span>
}

/**
 * Every card carries the same things in the same places — name, version,
 * status, IP, blurb, players, See more — whether the server is vanilla, runs a
 * pack we build, runs someone else's, or doesn't exist yet. Pack downloads live
 * on the server's own doc page, so one card can't end up taller or busier than
 * the one beside it.
 *
 * A `planned` server keeps its slot in the grid and masks anything it can't
 * honestly report. Nothing is pinged and no link is offered, but the space is
 * held so the grid doesn't reflow when the server goes live.
 */
function ServerCard({ server }) {
  const planned = server.status === 'planned'
  const isMinecraft = !planned && (!server.game || server.game === 'minecraft')
  const [status, setStatus] = useState(planned ? 'planned' : isMinecraft ? 'loading' : 'none')
  const [info, setInfo] = useState(null)

  useEffect(() => {
    if (!isMinecraft) {
      return undefined
    }

    let cancelled = false

    fetch(`https://api.mcsrvstat.us/3/${server.address}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) {
          return
        }

        setStatus(data.online ? 'online' : 'offline')
        setInfo(data)
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('offline')
        }
      })

    return () => {
      cancelled = true
    }
  }, [server.address, isMinecraft])

  // One version, never two. What the server actually reports wins; the declared
  // version in servers.js is only the fallback for when we can't reach it.
  const version = (status === 'online' && info?.version) || server.version || null

  return (
    <Card className={clsx('tw-flex tw-flex-col tw-gap-3', planned && 'tw-opacity-50')}>
      <div className="tw-flex tw-items-center tw-justify-between tw-gap-3">
        <div className="tw-flex tw-items-center tw-gap-2">
          <h3 className="tw-m-0">
            {server.docs && !planned ? (
              <Link to={server.docs} className="tw-text-base-content hover:tw-underline">
                {server.name}
              </Link>
            ) : (
              server.name
            )}
          </h3>
          {version && <span className="tw-badge tw-badge-ghost">{version}</span>}
        </div>
        {status !== 'none' && <StatusBadge status={status} />}
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
            planned || status === 'online' ? 'tw-opacity-100' : 'tw-opacity-0',
          )}
        >
          <span>
            <span className="tw-font-bold">
              {planned ? MASK : info?.players ? `${info.players.online} / ${info.players.max}` : '—'}
            </span>{' '}
            players
          </span>
        </div>
        <div className="tw-flex tw-items-center tw-gap-3">
          {server.docs && !planned && (
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
