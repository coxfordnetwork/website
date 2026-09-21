import { useEffect, useState } from 'react'

/**
 * Live status is OFF. Nothing on the site pings a server any more.
 *
 * Set LIVE_STATUS back to true to bring it back — the ping, the Online/Offline
 * pill and the player counts all hang off this one flag, and the call sites
 * already handle 'none' by rendering nothing.
 *
 * `status` is one of:
 *   'planned'  the server doesn't exist yet — nothing is pinged
 *   'none'     nothing to report (what every real server returns while off)
 *   'loading' | 'online' | 'offline'   only reachable with LIVE_STATUS on
 */
const LIVE_STATUS = false

export function useServerStatus(server) {
  const planned = server?.status === 'planned'
  const pingable =
    LIVE_STATUS && Boolean(server) && !planned && (!server.game || server.game === 'minecraft')
  const [status, setStatus] = useState(planned ? 'planned' : pingable ? 'loading' : 'none')
  const [info, setInfo] = useState(null)

  useEffect(() => {
    if (!pingable) {
      return undefined
    }

    let cancelled = false

    fetch(`https://api.mcsrvstat.us/3/${server.address}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setStatus(data.online ? 'online' : 'offline')
          setInfo(data)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('offline')
        }
      })

    return () => {
      cancelled = true
    }
  }, [server?.address, pingable])

  return { status, info }
}

/**
 * The one version to show. What the server actually reports wins; the version
 * declared in servers.js is only the fallback for when we can't reach it, so a
 * declared and a live version never appear side by side.
 */
export function displayVersion(server, status, info) {
  return (status === 'online' && info?.version) || server?.version || null
}

/** "3 / 20", or null when there's nothing honest to say. */
export function playerCount(status, info) {
  if (status !== 'online' || !info?.players) {
    return null
  }

  return `${info.players.online} / ${info.players.max}`
}
