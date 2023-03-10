import { useRef, useState } from 'react'
import reactLogo from './../assets/react.svg'
import React from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  const myRef = useRef('')

  function handleSubmit(event) {
    event.preventDefault()
    console.log(myRef.current.value)
    myRef.current.value = ''
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="something" placeholder='Say something...' ref={myRef}/>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
