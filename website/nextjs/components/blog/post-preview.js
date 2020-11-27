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
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  )
}
