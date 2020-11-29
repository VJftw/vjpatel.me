import unified from 'unified'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import autolink from 'rehype-autolink-headings'
import attacher from 'rehype-highlight'
import renderSvg from 'rehype-mathjax'
import gfm from 'remark-gfm'

export default async function markdownToHtml(markdown) {
  const result = await unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(autolink)
    .use(attacher)
    .use(renderSvg)
    .use(gfm)
    .use(rehypeStringify)
    .process(markdown)

  return result.toString()
}
