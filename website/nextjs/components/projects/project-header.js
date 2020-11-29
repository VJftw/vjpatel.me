import ProjectTitle from './project-title'
import { StatusColour } from '../../lib/labels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'


export default function ProjectHeader({ 
  slug,
  date,
  title,
  description,
  status,
  links,
}) {
  let statusLabelColour = StatusColour(status)
  return (
    <>
      <ProjectTitle>{title}</ProjectTitle>
      <div className="max-w-2xl mx-auto mb-6">
        <div className="text-sm text-center text-gray-800">
          {description}
        </div>
        <div className="text-sm text-left text-gray-800 flex flex-row">
          <div className="flex-grow">
            {links !== undefined && "website" in links &&
              <a target="_blank" href={links.website}>
                <FontAwesomeIcon icon={faGlobe} className="ml-1" fixedWidth/>
              </a>
            }
            {links !== undefined && "githubAddress" in links &&
              <a target="_blank" href={links.githubAddress}>
                <FontAwesomeIcon icon={faGithub} className="ml-1" fixedWidth/>
              </a>
            }
          </div>
          <span className={`ml-auto flex-shrink label ${statusLabelColour}`}>{status}</span>
        </div>
      </div>
    </>
  )
}
