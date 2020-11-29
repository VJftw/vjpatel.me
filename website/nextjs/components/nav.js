import Link from "next/link";
import { Author } from "../lib/constants";

export default function Navbar() {
  return (
    // <nav className="bg-gray-800">
    <nav className="flex-shrink">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link href="/">
              <a className="flex-shrink-0 flex items-center text-xl text-gray-800 font-semibold hover:underline hover:text-current">
                <img
                  className="h-10 w-10 mr-2 rounded-full"
                  src={Author.picture}
                  alt=""
                />
                VJ Patel
              </a>
            </Link>
            <div className="hidden sm:block sm:ml-auto">
              <div className="flex space-x-4">
              <Link href="/blog"><a>Blog</a></Link>
              <Link href="/projects"><a>Projects</a></Link>
              <Link href="/notes"><a>Notes</a></Link>
              <Link href="/academic"><a>Academic</a></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--
    Mobile menu, toggle classNamees based on menu state.

    Menu open: "block", Menu closed: "hidden"
  --> */}
      <div className="hidden sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Team
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Projects
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
}
