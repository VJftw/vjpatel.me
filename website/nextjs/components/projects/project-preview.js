import Avatar from '../util/avatar'
import DateFormatter from '../util/date-formatter'
import Link from 'next/link'

export default function ProjectPreview({
  title,
  date,
  slug,
}) {
  return (
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/projects/${slug}`} href="/projects/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}
