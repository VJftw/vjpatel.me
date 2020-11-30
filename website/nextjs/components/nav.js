import Link from "next/link";
import { Author } from "../lib/constants";
import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <nav className="relative flex flex-wrap items-center justify-between navbar-expand-md">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between max-w-7xl">
        <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
          <Link href="/">
            <a className="flex-shrink-0 flex items-center text-xl text-gray-800 font-semibold hover:underline hover:text-current">
              <img
                className="h-10 w-10 mr-2 rounded-full"
                src={require(`../public/images/author.jpg`)}
                alt={`Picture of ${Author.name}`}
              />
              VJ Patel
            </a>
          </Link>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <FontAwesomeIcon icon={faBars} fixedWidth />
          </button>
        </div>
        <div
          className={
            "md:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <ul className="flex flex-col md:flex-row list-none items-center w-full md:w-auto md:ml-auto">
            <li className="nav-item">
              <Link href="/blog">
                <a>Blog</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/projects">
                <a>Projects</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/notes">
                <a>Notes</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/academic">
                <a>Academic</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
