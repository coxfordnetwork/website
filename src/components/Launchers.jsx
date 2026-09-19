import Link from '@docusaurus/Link'
import { useEffect, useState } from 'react'
import { detectOS, fetchModrinth, fetchPrism, osLabel } from '../utils/launchers'
import Card from './Card'

const launchers = [
  {
    id: 'prism',
    name: 'Prism Launcher',
    blurb: 'Recommended. Add Instance → Import → paste the pack link.',
    fetch: fetchPrism,
  },
  {
    id: 'modrinth',
    name: 'Modrinth App',
    blurb: 'Also fine. Create instance → From file → pick the downloaded .mrpack.',
    fetch: fetchModrinth,
  },
]

function LauncherCard({ launcher, os }) {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    launcher
      .fetch(os)
      .then(setInfo)
      .catch(() => setInfo({ url: null }))
  }, [launcher, os])

  return (
    <Card className="tw-flex tw-flex-col tw-gap-2">
      <div className="tw-flex tw-items-center tw-justify-between tw-gap-3">
        <h3 className="tw-m-0">{launcher.name}</h3>
        {info?.version && <span className="tw-badge tw-badge-ghost">{info.version}</span>}
      </div>
      <p className="tw-m-0 tw-text-sm tw-opacity-70 tw-flex-1">{launcher.blurb}</p>
      {info === null && <p className="tw-m-0 tw-text-sm tw-animate-pulse">Finding the download…</p>}
      {info && (
        <Link
          to={info.url || info.page}
          className={info.direct ? 'tw-btn tw-btn-sm !tw-btn-primary' : 'tw-btn tw-btn-sm'}
        >
          {info.direct ? `Download for ${osLabel[os]} ↓` : 'Download page →'}
        </Link>
      )}
    </Card>
  )
}

/** Download buttons for the launchers, aimed at the visitor's OS. */
export default function Launchers() {
  const [os, setOS] = useState('other')

  useEffect(() => {
    setOS(detectOS())
  }, [])

  return (
    <div className="tw-grid tw-gap-4 md:tw-grid-cols-2 tw-my-6">
      {launchers.map((l) => (
        <LauncherCard key={l.id} launcher={l} os={os} />
      ))}
    </div>
  )
}
