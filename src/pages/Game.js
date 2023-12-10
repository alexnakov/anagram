import React from 'react'
import { useState } from 'react'
import BoardSVG from '../components/BoardSVG.js'
import Letter from '../components/Letter.js'
import useKeyPress from 'react-use-keypress'


export default function Game() {
  const [n, setN] = useState(0)
  const [currentK, setCurrentK] = useState('')

  const ALLKEYS = 'qwertyuiopasdfghjklzxcvbnm'.split('')

  useKeyPress(ALLKEYS, e => {
    console.log(e.key)
  })
  
  return (
    <div style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <div style={{border: '1px solid red', width: '350px', height: '150px', position: 'relative'}}>
        <BoardSVG />
        <Letter letterText="a" x="0" y="100" n={n} setN={setN} currentK={currentK}/>
        <Letter letterText="n" x="100" y="100" n={n} setN={setN} currentK={currentK}/>
        <Letter letterText="e" x="200" y="100" n={n} setN={setN} currentK={currentK}/>
        <Letter letterText="m" x="300" y="100" n={n} setN={setN} currentK={currentK}/>
      </div>
    </div>
  )
}
