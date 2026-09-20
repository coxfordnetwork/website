import Link from '@docusaurus/Link'
import { useEffect, useState } from 'react'
import modpacks from '../data/modpacks'
import { fetchReleases, formatDate, formatSize, primaryAsset } from '../utils/github'
import { fetchPackIndex } from '../utils/mrpack'
import Card from './Card'
import CopyButton from './CopyButton'

/** Mod list read from the release's .mrpack, so it always matches the file. */
function PackContents({ asset }) {
  const [index, setIndex] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchPackIndex(asset)
      .then(setIndex)
      .catch(() => setError(true))
  }, [asset])

  if (error || (index && index.mods.length === 0)) {
    return null
  }

  if (!index) {
    return <p className="tw-m-0 tw-text-sm tw-opacity-70 tw-animate-pulse">Reading pack contents…</p>
  }

  return (
    <>
      <p className="tw-m-0 tw-text-sm tw-opacity-70">
        {[index.minecraft && `Minecraft ${index.minecraft}`, index.loader && `${index.loader} ${index.loaderVersion}`]
          .filter(Boolean)
          .join(' · ')}
      </p>
      <details>
        <summary className="tw-cursor-pointer tw-font-medium">Included mods ({index.mods.length})</summary>
        <ul className="tw-mt-2 tw-mb-0 tw-columns-1 md:tw-columns-2 tw-text-sm">
          {index.mods.map((mod) => (
            <li key={mod}>
              <code className="tw-bg-transparent tw-border-0 tw-p-0">{mod}</code>
            </li>
          ))}
        </ul>
      </details>
    </>
  )
}

/**
 * Releases of a modpack from `src/data/modpacks.js`: a download card for the
 * latest version plus a list of previous ones. Embed in a server's doc page
 * with the server's `modpackId`.
 */
export default function ModpackDownloads({ modpackId }) {
  const modpack = modpacks.find((m) => m.id === modpackId)
  const [releases, setReleases] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!modpack) {
      return
    }

    fetchReleases(modpack)
      .then(setReleases)
      .catch(() => setError(true))
  }, [modpack])

  // A typo'd or not-yet-added id would otherwise take the whole page down.
  if (!modpack) {
    return (
      <Card>
        <p className="tw-m-0">
          Unknown modpack <code>{modpackId}</code> — add it to <code>src/data/modpacks.js</code>.
        </p>
      </Card>
    )
  }

  const releasesUrl = `https://github.com/${modpack.repo}/releases`
  const latest = releases?.[0]
  const latestAsset = latest ? primaryAsset(latest) : null
  const previous = releases?.slice(1) || []

  return (
    <section className="tw-my-6">
      {!releases && !error && <p className="tw-animate-pulse">Loading releases…</p>}

      {error && (
        <Card>
          <p className="tw-m-0">
            Couldn't load releases right now. Grab the pack directly from <Link to={releasesUrl}>GitHub</Link>.
          </p>
        </Card>
      )}

      {releases && releases.length === 0 && (
        <Card>
          <p className="tw-m-0">No releases yet.</p>
        </Card>
      )}

      {latest && (
        <Card className="tw-flex tw-flex-col tw-gap-3">
          <div className="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-flex-wrap">
            <div className="tw-flex tw-items-center tw-gap-3">
              <span className="tw-badge tw-badge-primary">{latest.tag_name}</span>
              <span className="tw-text-sm tw-opacity-70">Latest · {formatDate(latest.published_at)}</span>
            </div>
            {latestAsset && (
              <div className="tw-flex tw-items-center tw-gap-3">
                <span className="tw-text-sm tw-opacity-70">{formatSize(latestAsset.size)}</span>
                <CopyButton
                  text={latestAsset.browser_download_url}
                  label="Copy link"
                  className="tw-btn-sm"
                  title="Copy the .mrpack link to paste into Prism Launcher"
                />
                <Link to={latestAsset.browser_download_url} className="tw-btn tw-btn-sm !tw-btn-primary">
                  Download {latestAsset.name.endsWith('.mrpack') ? '.mrpack' : ''} ↓
                </Link>
              </div>
            )}
          </div>
          {latestAsset && <PackContents asset={latestAsset} />}
        </Card>
      )}

      {previous.length > 0 && (
        <details className="tw-mt-4">
          <summary className="tw-cursor-pointer tw-font-medium">Previous versions ({previous.length})</summary>
          <ul className="tw-list-none tw-p-0 tw-m-0 tw-mt-2 tw-divide-y tw-divide-base-content/10">
            {previous.map((release) => {
              const asset = primaryAsset(release)

              return (
                <li key={release.id} className="tw-flex tw-items-center tw-justify-between tw-gap-3 tw-py-2">
                  <span>
                    <span className="tw-font-medium">{release.tag_name}</span>{' '}
                    <span className="tw-text-sm tw-opacity-70">{formatDate(release.published_at)}</span>
                  </span>
                  {asset && (
                    <Link className="tw-text-sm tw-underline dark:tw-no-underline" to={asset.browser_download_url}>
                      Download
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </details>
      )}

      {releases && (
        <p className="tw-mt-4 tw-mb-0">
          <Link className="tw-text-sm" to={releasesUrl}>
            All releases on GitHub
          </Link>
        </p>
      )}
    </section>
  )
}
