import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import ProjectBody from '../../components/projects/project-body'
import Header from '../../components/header'
import ProjectHeader from '../../components/projects/project-header'
import Layout from '../../components/layout'
import { getProjectBySlug, getAllProjects } from '../../lib/api/projects'
import ProjectTitle from '../../components/projects/project-title'
import Head from 'next/head'
import { SITE_TITLE } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Project({ project, preview }) {
  const router = useRouter()
  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <ProjectTitle>Loading…</ProjectTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {project.title} | {SITE_TITLE}
                </title>
              </Head>
              <ProjectHeader
                title={project.title}
                coverImage={project.coverImage}
                date={project.date}
                author={project.author}
              />
              <ProjectBody content={project.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
  ])
  const content = await markdownToHtml(project.content || '')

  return {
    props: {
      project: {
        ...project,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const projects = getAllProjects(['slug'])

  return {
    paths: projects.map((project) => {
      return {
        params: {
          slug: project.slug,
        },
      }
    }),
    fallback: false,
  }
}
