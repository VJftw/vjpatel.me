import unified from 'unified'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import autolink from 'rehype-autolink-headings'
import attacher from 'rehype-highlight'
import math from 'remark-math'
import renderSvg from 'rehype-mathjax'
import gfm from 'remark-gfm'
import footnotes from 'remark-footnotes'

export default async function markdownToHtml(markdown) {
  const result = await unified()
    .use(remarkParse)
    .use(autolink)
    .use(attacher)
    .use(math)
    .use(renderSvg)
    .use(footnotes, {inlineNotes: true})
    .use(gfm)
    .use(remark2rehype)
    .use(rehypeStringify)
    .process(markdown)

  return result.toString()
}
