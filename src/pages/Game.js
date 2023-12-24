import React, { useEffect, useRef } from 'react'
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
    let canMoveUp = true

    if (duplicatesArray.includes(charArray[i])) {
      canMoveUp = false
    }

    arrayOfMaps.push({
      id: i, char: charArray[i], positionX: 70*i, positionY: 100, 
      canMoveUp: canMoveUp, canMoveDown: false,
    })

    duplicatesArray.push(charArray[i])
  }

  return arrayOfMaps
}

const doesLetterOccupyTheseCoords = (arrCharObjects, x, y) => {
  return arrCharObjects.some(charObj => charObj.positionX === x && charObj.positionY === y)
}
const nineRandomLetters = generateNRandomLetters(9)
const arrayOfMapsFromChars = createArrayOfMapsfromChars(nineRandomLetters)

export default function Game() {
  const [charStates, setCharStates] = useState(arrayOfMapsFromChars)
  const inputElement = useRef()

  const moveLetterDown = () => {
    const newCharStates = [...charStates]
    const topRow = charStates.filter(charObj => charObj.positionY === 0).sort((a, b) => a.positionX - b.positionX)
    if (topRow.length !== 0) {
      const charObjToMove = topRow[topRow.length - 1]
      for (let i = 0; i < 9; i++) {
        if (!doesLetterOccupyTheseCoords(charStates, i*70, 100)) {
          charObjToMove.positionX = 70*i
          charObjToMove.positionY = 100
          charObjToMove.canMoveDown = false
          newCharStates[charObjToMove.id] = charObjToMove
          setCharStates(newCharStates)
          break
        }
      }
    }
  }

  const resetCanMoveUpBottomRow = () => {
    const newCharStatesXSorted = [...charStates].sort((a,b)=>a.positionX-b.positionY)
    const lettersArr = []
    for (let i = 0; i < newCharStatesXSorted.length; i++) {
      if (newCharStatesXSorted[i].positionY === 100) {
        if (!lettersArr.includes(newCharStatesXSorted[i].char)) {
          newCharStatesXSorted[i].canMoveUp = true;
          lettersArr.push(newCharStatesXSorted[i].char)
        } else {
          newCharStatesXSorted[i].canMoveUp = false
        }
      }
    }

    setCharStates(newCharStatesXSorted.sort((a,b)=>a.id - b.id))
  }

  const allowNewLastLetterToMoveDown = () => {
    const topRow = charStates.filter(charObj => charObj.positionY === 0).sort((a, b)=>a.positionX-b.positionX)
    if (topRow.length === 0) { return; }
    const newLastTopLetter = topRow[topRow.length - 1]
    newLastTopLetter.canMoveDown = true
    const idOfNewLastTopLetter = topRow[topRow.length - 1].id
    const newCharStates = [...charStates]
    newCharStates[idOfNewLastTopLetter] = newLastTopLetter
    setCharStates(newCharStates)
  }

  const handleBackspace = e => {
    if (e.key == 'Backspace') { // Should be 'Backspace'
      moveLetterDown()
      resetCanMoveUpBottomRow()
      allowNewLastLetterToMoveDown()
    } 
    else if (e.key == '0') { // for testing purposes
      console.log(charStates)
    }
    else if (nineRandomLetters.includes(e.key)) {
      const charStatesDuplicateSorted = [...charStates].sort((a,b) => a.positionX - b.positionX)
      const lowestBottomRowLetterDuplicate = charStatesDuplicateSorted.find(charObj => charObj.positionY === 100 && charObj.char === e.key)
      if (lowestBottomRowLetterDuplicate == undefined) { return; }
      const topRowLength = charStates.filter(charObj => charObj.positionY === 0).length
      const newXCoord = topRowLength * 70
      lowestBottomRowLetterDuplicate.positionX = newXCoord
      lowestBottomRowLetterDuplicate.positionY = 0
      lowestBottomRowLetterDuplicate.canMoveDown = true
      lowestBottomRowLetterDuplicate.canMoveUp = false

      const newCharStates = [...charStates]
      newCharStates[charStatesDuplicateSorted.id] = lowestBottomRowLetterDuplicate
      setCharStates(newCharStates)
    }
  }

  return (
    <div style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <input ref={inputElement} autoFocus onKeyUp={e => handleBackspace(e)} style={{border: '1px solid red', height: '100px', position: 'absolute', outline: 'none', caretColor: 'transparent', color: '#000', opacity: 0.5, top: '100px', display: 'block'}} />
      <div style={{border: '1px solid red', width: '610px', height: '150px', position: 'relative'}}>
        <BoardSVG />

        {charStates.map(obj => {
          return (<MoveableLetter key={obj.id} id={obj.id} 
            positionX={obj.positionX} positionY={obj.positionY}
            canMove={obj.canMove} character={obj.char} 
            charStates={charStates}  setCharStates={setCharStates}
            inputElement={inputElement} 
            />
        )})}
      </div>
    </div>
  )
}
