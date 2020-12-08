import markdownStyles from '../markdown-styles.module.css'
import ReactMarkdown from 'react-markdown'
import {InlineMath, BlockMath} from 'react-katex'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {nord} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import gfm from 'remark-gfm'
import math from 'remark-math'
import footnotes from 'remark-footnotes'
import 'katex/dist/katex.min.css' // `react-katex` does not import the CSS for you


const renderers = {
  inlineMath: ({value}) => <InlineMath math={value} />,
  math: ({value}) => <BlockMath math={value} />,
  footnoteReference: (props) => {
    return (
      <sup id={"ref-" + props.identifier}>
        <a href={"#def-" + props.identifier}>{props.label}</a>
      </sup>
    );
  },
  footnoteDefinition: (props) => {
    return (
      <div className={markdownStyles.footnoteDefinition} id={"def-" + props.identifier}>
        <a className={markdownStyles.backToRef}
                href={"#ref-" + props.identifier}>{props.label}</a>
        <div className={markdownStyles.footnoteBody}>{props.children}</div>
      </div>
    );
  },
  code: ({language, value}) => <SyntaxHighlighter 
    showLineNumbers={true} 
    style={nord} 
    language={language} 
    children={value} 
  />,

}

export default function PostBody({ content }) {
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <ReactMarkdown
        className={markdownStyles['markdown']}
        plugins={[math, gfm, footnotes]}
        children={content}
        renderers={renderers}
      />
    </div>
  )
}
