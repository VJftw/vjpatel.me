import markdownStyles from '../markdown-styles.module.css'

export default function PostBody({ content }) {
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
