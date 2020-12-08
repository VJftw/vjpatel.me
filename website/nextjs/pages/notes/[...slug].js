import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import NoteBody from '@/components/notes/note-body'
import NoteHeader from '@/components/notes/note-header'
import Layout from '@/components/layout'
import { getNoteBySlug, getAllNotes } from '../../lib/api/notes'
import NoteTitle from '@/components/notes/note-title'
import Head from 'next/head'
import { SITE_TITLE } from '../../lib/constants'

export default function Note({ note, preview }) {
  const router = useRouter()
  if (!router.isFallback && !note?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <NoteTitle>Loading…</NoteTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {note.title} | {SITE_TITLE}
                </title>
              </Head>
              <NoteHeader
                title={note.title}
                coverImage={note.coverImage}
                date={note.date}
                author={note.author}
              />
              <NoteBody content={note.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const note = getNoteBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'directory',
    'content',
  ])
  const content = note.content || ''

  return {
    props: {
      note: {
        ...note,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const notes = await getAllNotes(['slug'])
  return {
    paths: notes.map(note => ({
      params: {
        slug: note.slug.split("/"),
      },
    })),
    fallback: false,
  }
}
