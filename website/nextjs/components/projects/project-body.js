import RenderMarkdown from '../util/render-markdown'

export default function ProjectBody({ content }) {
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <RenderMarkdown content={content} />
    </div>
  )
}
