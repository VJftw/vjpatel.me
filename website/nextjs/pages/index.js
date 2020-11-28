import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faCogs, faCloud, faMusic, faRocket, faTv } from '@fortawesome/free-solid-svg-icons'

import { SITE_TITLE } from '../lib/constants'

export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>{SITE_TITLE}</title>
        </Head>
        <Container>
          <div className="text-2xl text-center font-light leading-loose">
            <p>Hi, I'm a Backend Engineer in Cloud Security at Thought Machine, helping build and automate security at scale.</p>
            <p>I explore <FontAwesomeIcon icon={faLock}/> Security, <FontAwesomeIcon icon={faCogs}/> Dev Ops and the <FontAwesomeIcon icon={faCloud}/> Internet of Things.</p>
            <p>You can also find me at <FontAwesomeIcon icon={faMusic}/> festivals, excited about <FontAwesomeIcon icon={faRocket}/> space exploration and binge watching <FontAwesomeIcon icon={faTv}/> TV shows.</p>
          </div>
        </Container>
      </Layout>
    </>
  )
}
