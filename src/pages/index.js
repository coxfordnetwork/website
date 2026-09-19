import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import Layout from '@theme/Layout'
import { useEffect } from 'react'
import ServerStatus from '../components/ServerStatus'
import styles from './index.module.css'

const description = 'coxford'



function Home() {
  useEffect(() => {
    document.querySelector('.navbar__inner').classList.add('tw-container', 'tw-mx-auto')
  }, [])

  return (
    <Layout description={description}>
      <Head>
        <title>coxford</title>
      </Head>
      <main className={styles.hero}>
        <div className="tw-container tw-mx-auto tw-px-6 tw-flex tw-items-center">
          <div className="tw-w-full tw-py-16 tw-flex tw-flex-col tw-gap-10">
            <div className={`tw-w-full ${styles.fadeUp} ${styles.delay1}`}>
              <BrowserOnly>{() => <ServerStatus  />}</BrowserOnly>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
