import JSZip from 'jszip'

/**
 * Download a release's `.mrpack` asset in the browser and read its
 * `modrinth.index.json`, so the mod list on the site always matches the
 * published pack. Returns { name, minecraft, loader, loaderVersion, mods }.
 */
export async function fetchPackIndex(asset) {
  // The API asset URL supports CORS and redirects to the actual file.
  const res = await fetch(asset.url, { headers: { Accept: 'application/octet-stream' } })

  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}`)
  }

  const zip = await JSZip.loadAsync(await res.arrayBuffer())
  const index = JSON.parse(await zip.file('modrinth.index.json').async('string'))

  const deps = index.dependencies || {}
  const loaderKey = Object.keys(deps).find((k) => k !== 'minecraft')

  const mods = (index.files || [])
    .map((f) =>
      f.path
        .split('/')
        .pop()
        .replace(/\.jar$/, ''),
    )
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

  return {
    name: index.name,
    minecraft: deps.minecraft,
    loader: loaderKey,
    loaderVersion: loaderKey ? deps[loaderKey] : null,
    mods,
  }
}
