import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import glob from 'glob'
import path from 'path'

const notesDirectory = join(process.cwd(), '..', 'content', 'notes')

export function getNoteSlugs() {
  return glob.sync("**/*.md", 
    {cwd:notesDirectory},
  )
}

export function getNoteBySlug(slug, fields = []) {
  if (Array.isArray(slug)) {
    slug = slug.join("/")
  }
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(notesDirectory, realSlug + ".md")
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
      items['directory'] = path.dirname(realSlug)
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllNotes(fields = []) {
  const slugs = getNoteSlugs()
  const notes = slugs
    .map((slug) => getNoteBySlug(slug, fields))
    // sort notes by date in descending order
    .sort((project1, project2) => (project1.date > project2.date ? '-1' : '1'))
  return notes
}
