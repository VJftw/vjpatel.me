import Link from 'next/link'
import { StatusColour } from '../../lib/labels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'



export default function ProjectPreview({
  slug,
  date,
  title,
  description,
  status,
  links,
}) {
  let statusLabelColour = StatusColour(status)
  return (
    <div className="shadow m-3 p-2 rounded-sm hover:bg-accent-1 hover:text-current flex flex-col">
        <Link as={`/projects/${slug}`} href="/projects/[slug]">
        <a className="flex-grow">
          <div className="flex flex-row">
            <h3 className="text-xl mb-2 leading-snug flex-grow">
                {title}
            </h3>
            <div className="flex-shrink">
              <span className={`label ${statusLabelColour}`}>{status}</span>
            </div>
          </div>
          <div className="flex flex-row">
            <p className="text-sm leading-relaxed mb-2 text-gray-700 mx-1">{description}</p>
          </div>
        </a>
        </Link>
          <div className="flex flex-shrink flex-col">
            <div className="ml-auto ">
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
          </div>
    </div>
    
  )
}
