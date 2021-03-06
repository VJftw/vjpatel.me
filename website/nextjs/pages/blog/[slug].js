import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/blog/post-body'
import PostHeader from '../../components/blog/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api/blog'
import PostTitle from '../../components/blog/post-title'
import Head from 'next/head'
import { SITE_TITLE } from '../../lib/constants'
import readingTime from 'reading-time'

export default function Post({ post, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head><title>{post.title} | {SITE_TITLE}</title></Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                readingTime={post.readingTime}
                excerpt={post.excerpt}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'excerpt',
    'ogImage',
    'coverImage',
  ])
  const content = post.content || ''
  post.readingTime = readingTime(post.content).text

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
