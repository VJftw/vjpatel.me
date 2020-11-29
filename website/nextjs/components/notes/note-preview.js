import Link from 'next/link'

export default function NotePreview({
  title,
  date,
  slug,
  directory,
}) {
  return (
    <Link as={`/notes/${slug}`} href="/notes/[slug]">
      <a className="shadow m-3 p-2 rounded-sm hover:bg-accent-1 hover:text-current">
        <h3 className="text-xl mb-2 leading-snug">
            {title}
        </h3>
        <div className="text-sm italic mb-1 text-gray-700 mx-1">
          {directory}
        </div>
      </a>
    </Link>
  )
}
