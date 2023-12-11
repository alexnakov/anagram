import React from 'react'
import { useState } from 'react'
import BoardSVG from '../components/BoardSVG.js'
import Letter from '../components/Letter.js'
import useKeyPress from 'react-use-keypress'


export default function Game() {
  const ALLKEYS = ['a', 'n', 'e', 'm', 'w', 'v', 't', 'y', 'i']
  
  // STATES
  const [finalWord, setFinalWord] = useState('')
  const [layoutArr, setLayoutArr] = useState([
    ['', '', '', '', '', '', '', '', ''], 
    ALLKEYS]
  )

  // Updating state of key pressed
  // The Hook only listens if one of the 9 keys are pressed and no other keys.
  useKeyPress([...ALLKEYS, 'Backspace'], e => {
    moveLetters(e.key)
    setFinalWord(layoutArr[0].filter(el => el !== ''))
  })

  // If a key is pressed, the code checks if the other Arr has a next free spot
  const moveLetters = currentK => { 
    if (currentK === 'Backspace') {
      let newLayout = [...layoutArr]
      for (let i = newLayout[0].length - 1; i > -1; i--) {
        if (newLayout[0][i] !== '') {
          const firstEmptyIndex = newLayout[1].indexOf('')
          newLayout[1][firstEmptyIndex] = newLayout[0][i]
          newLayout[0][i] = ''
          setLayoutArr(newLayout)
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
    } 
    else if (layoutArr[1].includes(currentK)) {
      let newLayout = [...layoutArr]
      const selectedLetterIndex = newLayout[1].indexOf(currentK)
      const firstEmptySpaceIndex = newLayout[0].indexOf('')
  
      newLayout[1][selectedLetterIndex] = ''
      newLayout[0][firstEmptySpaceIndex] = currentK 
      setLayoutArr(newLayout)
    }
  }
  
  return (
    <div style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <div style={{border: '1px solid red', width: '610px', height: '150px', position: 'relative'}}>
        <BoardSVG />

        {ALLKEYS.map((el, index) => {
          return (<Letter key={index} letterText={el} x={70*index} y="100" layoutArr={layoutArr} />)
        })}

      </div>
    </div>
  )
}
