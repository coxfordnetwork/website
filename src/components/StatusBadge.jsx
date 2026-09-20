/**
 * The one status pill, used by the homepage cards and the server doc pages.
 * Takes a `status` from useServerStatus; 'none' renders nothing, so a
 * non-Minecraft server simply has no pill rather than a misleading one.
 */
export default function StatusBadge({ status }) {
  if (status === 'none') {
    return null
  }

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
