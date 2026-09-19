/**
 * Fetch a modpack's releases, newest first.
 *
 * Accepts a pack from `src/data/modpacks.js`: releases come from its GitHub
 * repo, optionally narrowed by `tagPattern` when several packs share one repo.
 */
export async function fetchReleases(modpack) {
  const res = await fetch(`https://api.github.com/repos/${modpack.repo}/releases?per_page=100`)

  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}`)
  }

  const releases = await res.json()
  const pattern = modpack.tagPattern ? new RegExp(modpack.tagPattern) : null

  return releases.filter((r) => !r.draft && (!pattern || pattern.test(r.tag_name)))
}

/** Find the primary downloadable asset (.mrpack preferred) of a release. */
export function primaryAsset(release) {
  const assets = release.assets || []

  return assets.find((a) => a.name.endsWith('.mrpack')) || assets[0] || null
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatSize(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  return `${Math.round(bytes / 1024)} KB`
}
