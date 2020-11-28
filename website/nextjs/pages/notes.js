import Container from '../components/container'
import AllNotes from '../components/notes/all-notes'
import Layout from '../components/layout'
import { getAllNotes } from '../lib/api/notes'
import Head from 'next/head'
import { SITE_TITLE } from '../lib/constants'

export default function Blog({ allNotes }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Notes | {SITE_TITLE}</title>
        </Head>
        <Container>
          {allNotes.length > 0 && <AllNotes notes={allNotes} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allNotes = getAllNotes([
    'title',
    'date',
    'slug',
  ])

  return {
    props: { allNotes },
  }
}
