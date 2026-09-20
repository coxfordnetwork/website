import Link from '@docusaurus/Link'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import servers from '../data/servers'
import Card from './Card'
import CopyButton from './CopyButton'

function StatusBadge({ status }) {
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
 * status, IP, blurb, player count, Quick Setup — whether the server is vanilla,
 * runs a pack we build, or runs one from CurseForge. Pack downloads live on the
 * server's own doc page, behind Quick Setup, so one card can't end up taller or
 * busier than the one beside it.
 */
function ServerCard({ server }) {
  const isMinecraft = !server.game || server.game === 'minecraft'
  const [status, setStatus] = useState(isMinecraft ? 'loading' : 'none')
  const [info, setInfo] = useState(null)

  useEffect(() => {
    if (!isMinecraft) {
      return
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

  return (
    <Card className="tw-flex tw-flex-col tw-gap-3">
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
          {server.version && <span className="tw-badge tw-badge-ghost">{server.version}</span>}
        </div>
        {status !== 'none' && <StatusBadge status={status} />}
      </div>
      <div className="tw-flex tw-items-center tw-gap-1">
        IP: <code className="tw-pl-2 tw-pr-2 tw-text-sm">{server.address}</code>
        <CopyButton className="tw-btn-xs tw-font-mono" text={server.address} title="Copy server address" />
      </div>
      <p className="tw-m-0 tw-flex-1">{server.description}</p>
      <div className="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-flex-wrap">
        <div
          className={clsx(
            'tw-flex tw-gap-6 tw-text-sm tw-font-medium tw-transition-opacity',
            status === 'online' ? 'tw-opacity-100' : 'tw-opacity-0',
          )}
        >
          <span>
            <span className="tw-font-bold">{info?.players ? `${info.players.online} / ${info.players.max}` : '—'}</span>{' '}
            players
          </span>
          {info?.version && (
            <span>
              <span className="tw-font-bold">{info.version}</span>
            </span>
          )}
        </div>
        <div className="tw-flex tw-items-center tw-gap-3">
          {server.docs && (
            <Link to={server.docs} className="tw-text-sm tw-underline dark:tw-no-underline tw-whitespace-nowrap">
              Quick Setup
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
