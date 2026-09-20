import Link from '@docusaurus/Link'
import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'
import modpacks from '../data/modpacks'
import servers from '../data/servers'
import { assetByExt, fetchReleases } from '../utils/github'

function Chevron() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

/** A menu entry that copies to the clipboard and confirms in place. */
function CopyAction({ text, label, onDone }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      role="menuitem"
      className="tw-w-full tw-text-left tw-px-3 tw-py-2 tw-text-sm tw-bg-transparent tw-cursor-pointer hover:tw-bg-base-200"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true)
          setTimeout(() => {
            setCopied(false)
            onDone?.()
          }, 1200)
        })
      }}
    >
      {copied ? 'Copied ✓' : label}
    </button>
  )
}

/**
 * One instance: its name on the left, a split download button on the right.
 *
 * The menu is built from the files that actually exist for this instance, not
 * from a fixed list — a pack we build offers whichever of .mrpack / .zip its
 * latest release has attached, an external pack offers the single link it
 * publishes. Nothing in the menu is ever a dead entry.
 */
function InstanceRow({ instance, minecraft }) {
  const modpack = instance.modpackId ? modpacks.find((m) => m.id === instance.modpackId) : null
  const [release, setRelease] = useState(null)
  const [failed, setFailed] = useState(false)
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!modpack) {
      return undefined
    }

    let cancelled = false

    fetchReleases(modpack)
      .then((releases) => {
        if (!cancelled) {
          setRelease(releases[0] || null)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [modpack])

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const onPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const external = instance.external
  const mrpackUrl = release ? assetByExt(release, '.mrpack')?.browser_download_url : null
  const zipUrl = release ? assetByExt(release, '.zip')?.browser_download_url : external?.download || null
  const primaryUrl = mrpackUrl || zipUrl
  const version = release?.tag_name || external?.version || null

  const actions = [
    mrpackUrl && { key: 'mrpack', label: 'Download .mrpack (Modrinth)', href: mrpackUrl },
    zipUrl && { key: 'zip', label: 'Download .zip', href: zipUrl },
  ].filter(Boolean)

  const pending = modpack && !release && !failed
  const missing = !primaryUrl && !pending

  return (
    <div className="tw-flex tw-items-start tw-justify-between tw-gap-4 tw-py-4 tw-border-0 tw-border-b tw-border-solid tw-border-base-300">
      <div className="tw-min-w-0">
        <div className="tw-flex tw-items-center tw-gap-2 tw-flex-wrap">
          <span className="tw-font-medium">{instance.name}</span>
          {version && <span className="tw-badge tw-badge-ghost tw-badge-sm">{version}</span>}
        </div>
        {instance.blurb && <p className="tw-m-0 tw-mt-1 tw-text-sm tw-opacity-70">{instance.blurb}</p>}
      </div>

      <div className="tw-relative tw-shrink-0" ref={wrapRef}>
        {pending && (
          <span className="tw-btn tw-btn-sm tw-btn-disabled tw-animate-pulse tw-whitespace-nowrap">Loading…</span>
        )}

        {missing && (
          <span className="tw-text-sm tw-opacity-70 tw-whitespace-nowrap">
            {modpack ? <Link to={`https://github.com/${modpack.repo}/releases`}>No build yet</Link> : 'Unavailable'}
          </span>
        )}

        {primaryUrl && (
          <>
            <div className="tw-join">
              {/* `!tw-no-underline` beats `.theme-doc-markdown a`, which would
                  otherwise underline these on a doc page. */}
              <Link
                to={primaryUrl}
                className="tw-btn tw-btn-sm !tw-btn-primary tw-join-item tw-whitespace-nowrap !tw-no-underline"
              >
                Download
              </Link>
              <button
                type="button"
                className="tw-btn tw-btn-sm !tw-btn-primary tw-join-item tw-px-2"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={`More downloads for ${instance.name}`}
                onClick={() => setOpen((v) => !v)}
              >
                <Chevron />
              </button>
            </div>

            {open && (
              <div
                role="menu"
                className={clsx(
                  'tw-absolute tw-right-0 tw-top-full tw-mt-1 tw-z-20 tw-min-w-[15rem]',
                  'tw-flex tw-flex-col tw-py-1 tw-rounded-xl tw-border tw-border-solid tw-border-base-300 tw-bg-base-100',
                )}
              >
                {/* Prism is a Minecraft launcher, so it's only named on a
                    Minecraft server's page. */}
                <CopyAction
                  text={primaryUrl}
                  label={minecraft ? 'Copy link (Prism)' : 'Copy link'}
                  onDone={() => setOpen(false)}
                />
                {actions.map((a) => (
                  <Link
                    key={a.key}
                    role="menuitem"
                    to={a.href}
                    className="tw-px-3 tw-py-2 tw-text-sm tw-text-base-content hover:tw-bg-base-200 !tw-no-underline"
                    onClick={() => setOpen(false)}
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

/**
 * The instance table for one server, from its `instances` in servers.js.
 * A server with no instances renders nothing at all, so a vanilla server's
 * page simply doesn't have this section.
 */
export default function InstanceTable({ serverId }) {
  const server = servers.find((s) => s.id === serverId)
  const instances = server?.instances || []
  const minecraft = !server?.game || server.game === 'minecraft'

  if (instances.length === 0) {
    return null
  }

  return (
    <div className="tw-my-6 tw-border-0 tw-border-t tw-border-solid tw-border-base-300">
      {instances.map((instance) => (
        <InstanceRow key={instance.id} instance={instance} minecraft={minecraft} />
      ))}
    </div>
  )
}
