import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { SITE_TITLE } from '../lib/constants'

export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>{SITE_TITLE}</title>
        </Head>
        <Container>
          <Intro />
        </Container>
      </Layout>
    </>
  )
}
