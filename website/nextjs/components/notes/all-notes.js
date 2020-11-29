import NotePreview from './note-preview'

export default function AllNotes({ notes }) {
  notes = notes.sort((i,j) => (i.slug > j.slug) ? 1 : ((j.slug > i.slug) ? -1 : 0))
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-1 lg:col-gap-16 xl:col-gap-32 row-gap-20 lg:row-gap-32">
        {notes.map((note) => (
          <NotePreview
            key={note.slug}
            title={note.title}
            date={note.date}
            slug={note.slug}
            directory={note.directory}
          />
        ))}
      </div>
    </section>
  )
}
