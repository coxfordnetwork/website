/**
 * Direct installer downloads for the launchers that import .mrpack files.
 * The site works out the visitor's OS so the button is a one-click download.
 */

const PRISM_RELEASES = 'https://api.github.com/repos/PrismLauncher/PrismLauncher/releases/latest'
const MODRINTH_UPDATES = 'https://launcher-files.modrinth.com/updates.json'
// Used when updates.json can't be read from the browser.
const MODRINTH_FALLBACK_VERSION = '0.20.4'

export function detectOS() {
  if (typeof navigator === 'undefined') {
    return 'other'
  }

  const ua = navigator.userAgent

  if (/Windows/i.test(ua)) return 'windows'
  if (/Mac/i.test(ua)) return 'macos'
  if (/Linux/i.test(ua)) return 'linux'

  return 'other'
}

export const osLabel = { windows: 'Windows', macos: 'macOS', linux: 'Linux', other: 'your OS' }

/** Prism Launcher: pick the release asset for the OS from the latest GitHub release. */
export async function fetchPrism(os) {
  const page = 'https://prismlauncher.org/download/'
  const res = await fetch(PRISM_RELEASES)

  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}`)
  }

  const release = await res.json()
  const assets = release.assets || []
  const pick = (re) => assets.find((a) => re.test(a.name))

  const asset =
    os === 'windows'
      ? pick(/Windows-MSVC-Setup-[\d.]+\.exe$/)
      : os === 'macos'
        ? pick(/macOS-[\d.]+\.dmg$/)
        : os === 'linux'
          ? pick(/Linux-x86_64\.AppImage$/)
          : null

  return { version: release.tag_name, url: asset ? asset.browser_download_url : page, page, direct: !!asset }
}

/** Modrinth App: installer URLs follow a fixed pattern per version. */
export async function fetchModrinth(os) {
  const page = 'https://modrinth.com/app'
  let version = MODRINTH_FALLBACK_VERSION

  try {
    const res = await fetch(MODRINTH_UPDATES)

    if (res.ok) {
      version = (await res.json()).version || version
    }
  } catch {
    // keep the fallback version
  }

  const base = `https://launcher-files.modrinth.com/versions/${version}`
  const url =
    os === 'windows'
      ? `${base}/windows/Modrinth%20App_${version}_x64-setup.exe`
      : os === 'macos'
        ? `${base}/macos/Modrinth%20App_${version}_universal.dmg`
        : os === 'linux'
          ? `${base}/linux/Modrinth%20App_${version}_amd64.AppImage`
          : page

  return { version, url, page, direct: url !== page }
}
