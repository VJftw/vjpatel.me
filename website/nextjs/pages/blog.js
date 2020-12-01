import Container from '../components/container'
import AllPosts from '../components/blog/all-posts'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api/blog'
import Head from 'next/head'
import { SITE_TITLE } from '../lib/constants'

export default function Blog({ allPosts }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Blog | {SITE_TITLE}</title>
        </Head>
        <Container>
          {allPosts.length > 0 && <AllPosts posts={allPosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'published',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
