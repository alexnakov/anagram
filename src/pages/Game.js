import React from 'react'
import { useState, useEffect } from 'react'
import BoardSVG from '../components/BoardSVG.js'
import { motion, spring } from 'framer-motion'
import Letter from '../components/Letter.js'


export default function Game() {
  // Will we index things with 0 to start with
  // I will do excitation for now and no de-excitation
  const [nextFreeTopBoxPos, setNextFreeTopBoxPos] = useState([0, 0])
  
  const letters = ["A", "N", "E", "M"]

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true)
  }, [])

  const detectKeyDown = e => {
    if (letters.includes(e.key)) {
      
    }
  }
  
  return (
    <div style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <div style={{border: '1px solid red', width: '350px', height: '150px', position: 'relative'}}>
        <BoardSVG />
        <Letter letterText="A" x="0" y="100" />
        <Letter letterText="N" x="100" y="100" />
        <Letter letterText="E" x="200" y="100" />
        <Letter letterText="M" x="300" y="100" />
      </div>
    </div>
  )
}
