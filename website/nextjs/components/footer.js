import Container from './container'
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Author } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-accent-4 flex-shrink text-gray-800">
      <Container>
        <div className="my-2 flex-row md:flex-col">
          <div className="">
            <ul>
              <li><strong>{Author.name}</strong></li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="mr-1" fixedWidth/>
                <a href={`mailto:${Author.email}`}>{Author.email}</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faMapMarker} className="mr-1" fixedWidth/>
                {`${Author.location}`}
              </li>
            </ul>
            <ul>
              <li className="inline">
                <a target="_blank" href={Author.github}>
                  <FontAwesomeIcon icon={faGithub} className="mr-1" fixedWidth/>
                </a>
              </li>
              <li className="inline">
                <a target="_blank" href={Author.twitter}>
                  <FontAwesomeIcon icon={faTwitter} className="mr-1" fixedWidth/>
                </a>
              </li>
              <li className="inline">
                <a target="_blank" href={Author.linkedIn}>
                  <FontAwesomeIcon icon={faLinkedin} className="mr-1" fixedWidth/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}
