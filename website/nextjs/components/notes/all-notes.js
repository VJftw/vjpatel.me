import ProjectPreview from './notes-preview'

export default function AllNotes({ notes }) {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:col-gap-16 xl:col-gap-32 row-gap-20 lg:row-gap-32">
        {notes.map((note) => (
          <ProjectPreview
            key={note.slug}
            title={note.title}
            date={note.date}
            slug={note.slug}
          />
        ))}
      </div>
    </section>
  )
}
