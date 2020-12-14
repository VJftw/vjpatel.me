import markdownStyles from '../markdown-styles.module.css'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {nord} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import gfm from 'remark-gfm'
import MathJax from 'react-mathjax';
import RemarkMathPlugin  from 'remark-math'
import footnotes from 'remark-footnotes'


const renderers = {
  math: (props) => <MathJax.Node formula={props.value} />,
  inlineMath: (props) => <MathJax.Node inline formula={props.value} />,
  footnoteReference: (props) => {
    return (
      <small id={"ref-" + props.identifier}>
        <a href={"#def-" + props.identifier}>({props.label})</a>
      </small>
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

export default function RenderMarkdown({ content }) {
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <MathJax.Provider input="tex">
          <ReactMarkdown
            className={markdownStyles['markdown']}
            plugins={[RemarkMathPlugin, gfm, footnotes]}
            children={content}
            renderers={renderers}
          />
        </MathJax.Provider>
    </div>
  )
}
