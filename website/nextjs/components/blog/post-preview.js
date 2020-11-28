import Avatar from '../util/avatar'
import DateFormatter from '../util/date-formatter'
import Link from 'next/link'

export default function PostPreview({
  title,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <Link as={`/blog/${slug}`} href="/blog/[slug]">
      <a className="shadow m-3 p-2 rounded-sm hover:bg-accent-1 hover:text-current">
        <h3 className="text-xl mb-2 leading-snug">
            {title}
        </h3>
        <div className="text-sm italic mb-1 text-gray-700 mx-1">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-sm leading-relaxed mb-4 text-gray-700 mx-1">{excerpt}</p>
      </a>
    </Link>
  )
}
