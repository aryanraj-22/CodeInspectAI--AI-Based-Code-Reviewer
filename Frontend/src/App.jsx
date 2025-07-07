import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data)
  }

  return (
    <>
      <main style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
  { }
    <h1
    style={{
      position: "sticky",
      top: 0,
      backgroundColor: "#303030",
      textAlign: "center",
      margin: 0,
      padding: "15px",
      zIndex: 1000,
      borderBottom: "1px solid #ddd",
      color:"#FDDA0D",
      borderRadius: "10px"
    }}
  >
    CodeInspectAI
  </h1>

  { }
  <div style={{ display: "flex", flex: 1, gap: "20px", padding: "0 20px" }}>
    { }
    <div className="left" style={{ flex: 1 }}>
      <div className="code">
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
          padding={10}
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 16,
            border: "1px solid #ddd",
            borderRadius: "5px",
            height: "100%",
            width: "100%",
          }}
        />
      </div>
      <div
        onClick={reviewCode}
        className="review"
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          textAlign: "center",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Review
      </div>
    </div>

    {/* Right Panel */}
    <div className="right" style={{ flex: 1, overflowY: "auto" }}>
      <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
    </div>
  </div>
</main>

    </>
  )
}



export default App