import Link from 'next/link'

const wordMap = {
  "and": "and",
  "of": "of",
  "the": "the",
  "Aws": "AWS",
  "Isc2": "ISC2",
  "Ccsp": "CCSP",
  "Msc": "MSc",
  "7ccsmase": "7CCSMASE",
  "7ccsmcis": "7CCSMCIS",
  "7ccsmsen": "7CCSMSEN",
  "7ccsmwin": "7CCSMWIN",
  "7ccsmcfc": "7CCSMCFC",
  "7ccsmnse": "7CCSMNSE",
  "7ccsmsia": "7CCSMSIA",
}

export default function AllNotes({ notes }) {
  notes = notes.sort((i,j) => (i.slug > j.slug) ? 1 : ((j.slug > i.slug) ? -1 : 0))
  let notesTree = notesToTree(notes)
  return (
    <section>
      <div className="shadow grid grid-cols-1 lg:grid-cols-1 lg:col-gap-16 xl:col-gap-32 row-gap-20 lg:row-gap-32">
        <RecurseNotes notes={notesTree} />
      </div>
    </section>
  )
}

export function RecurseNotes({notes}) {
  return (
    Array.from(notes).map(([k, v]) => {
      if (v instanceof Map) {
        return (
          <div className=" m-2 p-2 rounded-sm">
          <h3 className="text-xl m-2 leading-snug">
              {humanize(k)}
          </h3>
          <div className="text-sm ml-2 text-gray-700 mx-1">
            <ul className="list-inside list-none">
              <RecurseNotes key={k} notes={v} />
            </ul>
          </div>
        </div>
        )
      }
      return (
        <Link as={`/notes/${v.slug}`} href="/notes/[slug]"><a>
          <li className="p-2 m-1 hover:bg-accent-1 hover:text-current">{v.title}</li>
        </a></Link>
      )     
    })
  )
}

function humanize(slug) {
  let newSlug = slug.replace(/-/g, " ");
  newSlug = newSlug.charAt(0).toUpperCase() + newSlug.slice(1)

  newSlug = newSlug.split(" ").map((x) => {
    if (x in wordMap) {
      return wordMap[x]
    }

    return x.charAt(0).toUpperCase() + x.slice(1)
  }).join(" ")

  return newSlug
}

function notesToTree(notes, tree = new Map()) {
  notes.forEach((n) => {
    tree = setNoteTreeEntry(tree, n.slug, n)
  })
  return tree
}

function setNoteTreeEntry(tree, path, note) {
  if (tree == undefined) {
    tree = new Map()
  }

  let pathParts = path.split("/") 

  if (pathParts.length > 1) {
    let pathHead = pathParts[0]
    let pathTail = pathParts.slice(1).join("/")
    return tree.set(
      pathHead, 
      setNoteTreeEntry(tree.get(pathHead), pathTail, note),
    )
  }

  return tree.set(path, note)
}
