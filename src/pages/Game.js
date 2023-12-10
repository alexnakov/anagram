import React from 'react'
import { useState } from 'react'
import BoardSVG from '../components/BoardSVG.js'
import Letter from '../components/Letter.js'
import useKeyPress from 'react-use-keypress'


export default function Game() {
  const [layoutArr, setLayoutArr] = useState([['', '', '', ''], ['a', 'n', 'e', 'm']])

  // Updating state of key pressed
  const ALLKEYS = 'name'.split('')
  useKeyPress([...ALLKEYS, 'Backspace'], e => {
    moveLetters(e.key)
  })

  const moveLetters = currentK => { 
    if (currentK === 'Backspace') {
      let newLayout = [...layoutArr]
      for (let i = newLayout[0].length - 1; i > -1; i--) {
        if (newLayout[0][i] !== '') {
          const firstEmptyIndex = newLayout[1].indexOf('')
          newLayout[1][firstEmptyIndex] = newLayout[0][i]
          newLayout[0][i] = ''
          setLayoutArr(newLayout)
          console.log(layoutArr)
          break
        }
      }
    }
    else if (layoutArr[0].includes(currentK)) {
      let newLayout = [...layoutArr]
      const selectedLetterIndex = newLayout[0].indexOf(currentK)
      const firstEmptySpaceIndex = newLayout[1].indexOf('')
  
      newLayout[0][selectedLetterIndex] = ''
      newLayout[1][firstEmptySpaceIndex] = currentK 
      setLayoutArr(newLayout)
      console.log(layoutArr)
    } 
    else if (layoutArr[1].includes(currentK)) {
      let newLayout = [...layoutArr]
      const selectedLetterIndex = newLayout[1].indexOf(currentK)
      const firstEmptySpaceIndex = newLayout[0].indexOf('')
  
      newLayout[1][selectedLetterIndex] = ''
      newLayout[0][firstEmptySpaceIndex] = currentK 
      setLayoutArr(newLayout)
      console.log(layoutArr)
    }
  }
  
  return (
    <div style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <div style={{border: '1px solid red', width: '350px', height: '150px', position: 'relative'}}>
        <BoardSVG />
        <Letter letterText="a" x="0" y="100" layoutArr={layoutArr}/>
        <Letter letterText="n" x="100" y="100" layoutArr={layoutArr} />
        <Letter letterText="e" x="200" y="100" layoutArr={layoutArr} />
        <Letter letterText="m" x="300" y="100" layoutArr={layoutArr} />
      </div>
    </div>
  )
}
