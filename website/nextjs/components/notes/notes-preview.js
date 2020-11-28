import Link from 'next/link'

export default function ProjectPreview({
  title,
  date,
  slug,
}) {
  return (
    <Link as={`/projects/${slug}`} href="/projects/[slug]">
      <a className="shadow m-3 p-2 rounded-sm hover:bg-accent-1 hover:text-current">
        <h3 className="text-xl mb-2 leading-snug">
            {title}
        </h3>
      </a>
    </Link>
  )
}
