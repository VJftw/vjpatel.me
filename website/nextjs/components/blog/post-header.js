import Avatar from '../util/avatar'
import DateFormatter from '../util/date-formatter'
import PostTitle from './post-title'

export default function PostHeader({ title, date, readingTime, excerpt }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="max-w-2xl mx-auto">
        <div className="text-sm text-center text-gray-800 font-normal mb-2">
          {excerpt}
        </div>
        <div className="mb-6 text-sm text-gray-800 flex flex-col md:flex-row">
          <div className="text-center md:flex-1 md:text-left"><DateFormatter dateString={date} /></div>
          <div className="text-center md:flex-1 md:text-right">{readingTime}</div>
        </div>
      </div>
    </>
  )
}
