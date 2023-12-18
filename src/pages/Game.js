import React, { useEffect } from 'react'
import { useState } from 'react'
import BoardSVG from '../components/BoardSVG.js'
import MoveableLetter from '../components/MoveableLetter.js'
import useKeyPress from 'react-use-keypress'

const getCanMoveArrayFromCharArray = charArray => {
  const charOccurrences = new Map()
  const moveArray = []

  for (let i = 0; i < charArray.length; i++) {
    var currentChar = charArray[i]
    if (charOccurrences.has(currentChar)) {
      moveArray.push(false)
      charOccurrences.set(currentChar, charOccurrences.get(currentChar) + 1)
    } else {
      moveArray.push(true)
      charOccurrences.set(currentChar, 1)
    }
  }

  return moveArray
}

export default function Game() {
  const charactersArray = ['a', 'b', 'c', 'b']

  const [canMoveArray, setCanMoveArray] = useState(
    getCanMoveArrayFromCharArray(charactersArray)
  )
  const [nextFreeTopSpot, setNextFreeTopSpot] = useState(0)
  const [arrayOfFreeBottomSpots, setArrayOfFreeBottomSpots] = useState([])

  return (
    <div style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <div style={{border: '1px solid red', width: '610px', height: '150px', position: 'relative'}}>
        <BoardSVG />

        {charactersArray.map((char, id) => {
          return (
            <MoveableLetter key={id} character={char} left={id*70} id={id} canMoveArray={canMoveArray} setCanMoveArray={setCanMoveArray} nextFreeTopSpot={nextFreeTopSpot} setNextFreeTopSpot={setNextFreeTopSpot} arrayOfFreeBottomSpots={arrayOfFreeBottomSpots} setArrayOfFreeBottomSpots={setArrayOfFreeBottomSpots} />
          )
        })}
      </div>
    </div>
  )
}
