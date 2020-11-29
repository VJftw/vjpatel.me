import Link from 'next/link'

export default function Course({
  yearRange,
  title,
  institution,
  institutionUrl,
  grade,
  achievements,
  cScore,
}) {
  return (
    <div className="flex flex-col mb-6">
      <div className="mb-1">
        {yearRange} - {title} at <a href={institutionUrl}>{institution}</a> ({grade})
      </div>
      <div className="ml-4 mb-1 text-sm">
        <ul className="list-disc list-inside">
          {achievements.map((achievement) => (
            <li>{achievement}</li>
          ))}
        </ul>
      </div>
      <div className="ml-4 text-sm">
        {cScore}
      </div>
    </div>
  )
}
