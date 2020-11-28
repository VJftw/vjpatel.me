import ProjectTitle from './notes-title'

export default function ProjectHeader({ title, date, author }) {
  return (
    <>
      <ProjectTitle>{title}</ProjectTitle>
      <div className="max-w-2xl mx-auto">
      </div>
    </>
  )
}
