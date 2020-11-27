import Avatar from '../util/avatar'
import DateFormatter from '../util/date-formatter'
import ProjectTitle from './project-title'

export default function ProjectHeader({ title, date, author }) {
  return (
    <>
      <ProjectTitle>{title}</ProjectTitle>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}
