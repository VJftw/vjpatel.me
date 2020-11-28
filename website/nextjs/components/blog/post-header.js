import Avatar from '../util/avatar'
import DateFormatter from '../util/date-formatter'
import PostTitle from './post-title'

export default function PostHeader({ title, date, author }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-sm text-center text-gray-800">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}
