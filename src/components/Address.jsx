import Link from '@docusaurus/Link'
import CopyButton from './CopyButton'

/**
 * Server address with a copy button, and — for servers with an external pack
 * (CurseForge etc.) — the pack's download and copy-link buttons on the same
 * line. Used at the top of each server's doc page.
 */
export default function Address({ address, modpack }) {
  return (
    <div className="tw-flex tw-items-center tw-justify-between tw-gap-x-6 tw-gap-y-3 tw-flex-wrap tw-my-4">
      <div className="tw-flex tw-items-center tw-gap-3">
        <code className="tw-text-lg tw-px-3 tw-py-2">{address}</code>
        <CopyButton text={address} className="tw-btn-sm" title="Copy server address" />
      </div>

      {modpack && (
        <div className="tw-flex tw-items-center tw-gap-3 tw-flex-wrap">
          <span className="tw-text-sm tw-opacity-70">
            <Link to={modpack.url}>{modpack.name}</Link> {modpack.version}
          </span>
          {modpack.download && (
            <>
              <CopyButton
                text={modpack.download}
                label="Copy link"
                className="tw-btn-sm"
                title="Copy the pack link to paste into Prism Launcher"
              />
              <Link to={modpack.download} className="tw-btn tw-btn-sm !tw-btn-primary">
                Download ↓
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}
