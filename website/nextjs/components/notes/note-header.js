import NoteTitle from './note-title'

export default function NoteHeader({ title, date, author }) {
  return (
    <>
      <NoteTitle>{title}</NoteTitle>
      <div className="max-w-2xl mx-auto">
      </div>
    </>
  )
}
