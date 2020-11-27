import Container from '../components/container'
import AllProjects from '../components/projects/all-projects'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllProjects } from '../lib/api/projects'
import Head from 'next/head'
import { SITE_TITLE } from '../lib/constants'

export default function Blog({ allProjects }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Blog | {SITE_TITLE}</title>
        </Head>
        <Container>
          <Intro />
          {allProjects.length > 0 && <AllProjects projects={allProjects} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allProjects = getAllProjects([
    'title',
    'date',
    'slug',
  ])

  return {
    props: { allProjects },
  }
}
