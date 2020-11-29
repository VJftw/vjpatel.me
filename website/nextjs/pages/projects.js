import Container from '../components/container'
import AllProjects from '../components/projects/all-projects'
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
          {allProjects.length > 0 && <AllProjects projects={allProjects} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allProjects = getAllProjects([
    'date',
    'slug',
    'title',
    'status',
    'description',
    'links',
  ])

  return {
    props: { allProjects },
  }
}
