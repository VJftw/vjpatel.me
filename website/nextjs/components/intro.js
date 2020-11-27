import Link from 'next/link'
import { Employer } from '../lib/constants'


export default function Intro() {
  return (
    <section className="flex-col lg:flex-row flex items-center lg:justify-between mt-16 mb-16 lg:mb-12">
      <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-tight lg:pr-8">
      <Link href="/">
        <a className="hover:underline">VJ Patel</a>
      </Link>
      </h1>
      <div className="flex-grow flex-col lg:flex-row lg:mt-auto mb-3">
      <h2><Link href="/blog">
        <a className="hover:underline">Blog</a>
      </Link></h2>
      <h2><Link href="/projects">
        <a className="hover:underline">Projects</a>
      </Link></h2>
      <h2><Link href="/notes">
        <a className="hover:underline">Notes</a>
      </Link></h2>
      <h2><Link href="/about">
        <a className="hover:underline">About</a>
      </Link></h2>
      </div>
      <h4 className="text-center lg:text-left text-lg mt-5 lg:pl-8">
        Security, Cloud Automation and the Internet of Things<br />
        @{''}
        <a
          href={Employer.website}
          className="underline hover:text-success duration-200 transition-colors"
          target="_blank"
        >
        {Employer.slug}
        </a>{' '}  
      </h4>
    </section>
  )
}
