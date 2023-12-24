import React, { useEffect } from 'react'
import { useState } from 'react'
import BoardSVG from '../components/BoardSVG.js'
import MoveableLetter from '../components/MoveableLetter.js'

const generateNRandomLetters = n => {
  /**
   * Return an array of n random letters
   * e.g. n = 4 -> ['t','e','w','e']
   */
  const alphabet = 'qwertyuioplkjhgfdsazxcvbnm'
  const returnArray = []
  for (let i = 0; i < n; i++) {
    returnArray.push(alphabet[Math.floor(Math.random() * alphabet.length)])   
  }

  return returnArray
}

const createArrayOfMapsfromChars = charArray => {
  const arrayOfMaps = []
  const duplicatesArray = []

  for (let i = 0; i < charArray.length; i++) {
    let canMove = true

    if (duplicatesArray.includes(charArray[i])) {
      canMove = false
    }

    arrayOfMaps.push({
      id: i, char: charArray[i], positionX: 70*i, positionY: 100, canMove: canMove,
    })

    duplicatesArray.push(charArray[i])
  }

  return arrayOfMaps
}

const nineRandomLetters = generateNRandomLetters(9)
const arrayOfMapsFromChars = createArrayOfMapsfromChars(nineRandomLetters)

export default function Game() {
  const [charStates, setCharStates] = useState(arrayOfMapsFromChars)

  return (
    <div  style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <div style={{border: '1px solid red', width: '610px', height: '150px', position: 'relative'}}>
        <BoardSVG />

        {charStates.map(obj => {
          return (<MoveableLetter key={obj.id} id={obj.id} 
            positionX={obj.positionX} positionY={obj.positionY}
            canMove={obj.canMove} character={obj.char} 
            charStates={charStates}  setCharStates={setCharStates}
            />
        )})}
      </div>
    </div>
  )
}
