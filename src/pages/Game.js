import React, { useRef } from 'react'
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

  for (let i = 0; i < charArray.length; i++) {
    arrayOfMaps.push({
      id: i, char: charArray[i], positionX: 70*i, positionY: 100, 
    })
  }

  return arrayOfMaps
}

const doesLetterOccupyTheseCoords = (arrCharObjects, x, y) => {
  return arrCharObjects.some(charObj => charObj.positionX === x && charObj.positionY === y)
}

const nineRandomLetters = generateNRandomLetters(9)
const arrayOfMapsFromChars = createArrayOfMapsfromChars(nineRandomLetters)

export default function Game() {
  const [finalWord, setFinalWord] = useState('')
  const [charStates, setCharStates] = useState(arrayOfMapsFromChars)
  const inputElement = useRef()

  const moveLetterDownOnBackspace = () => {
    const newCharStates = [...charStates]
    const topRow = charStates.filter(charObj => charObj.positionY === 0).sort((a, b) => a.positionX - b.positionX)
    if (topRow.length !== 0) {
      const charObjToMove = topRow[topRow.length - 1] // Top row with highest X coord
      for (let i = 0; i < 9; i++) {
        if (!doesLetterOccupyTheseCoords(charStates, i*70, 100)) {
          // Checks whether letter occupies X coords at the bottom row

          charObjToMove.positionX = 70*i // the un-occupied position now becomes line 56's position
          charObjToMove.positionY = 100
          newCharStates[charObjToMove.id] = charObjToMove
          setCharStates(newCharStates)
          return;
        }
      }
    }
  }

  const moveLetterUpOnKeyPress = (keyPressed) => {
    const charStatesDuplicateSorted = [...charStates].sort((a,b) => a.positionX - b.positionX)
    const lowestBottomRowLetterDuplicate = charStatesDuplicateSorted.find(charObj => charObj.positionY === 100 && charObj.char === keyPressed)
    if (lowestBottomRowLetterDuplicate == undefined) { return; }
    const topRowLength = charStates.filter(charObj => charObj.positionY === 0).length
    const newXCoord = topRowLength * 70
    lowestBottomRowLetterDuplicate.positionX = newXCoord
    lowestBottomRowLetterDuplicate.positionY = 0
    const newCharStates = [...charStates]
    newCharStates[charStatesDuplicateSorted.id] = lowestBottomRowLetterDuplicate
    setCharStates(newCharStates)
  }

  const updateFinalWord = () => {
    const topRow = charStates.filter(charObj => charObj.positionY === 0).sort((a,b) => a.positionX - b.positionX)
    var newFinalWord = ''
    if (topRow.length !== 0) {
      topRow.forEach(charObj => {
        newFinalWord += charObj.char
      });
    }
    setFinalWord(newFinalWord)
  }

  const handleKeyPresses = e => {
    if (e.key == 'Backspace') { // Should be 'Backspace'
      moveLetterDownOnBackspace()
    } 
    else if (e.key == '0') { // for testing purposes
      console.log(charStates)
    }
    else if (nineRandomLetters.includes(e.key.toLowerCase())) {
      moveLetterUpOnKeyPress(e.key.toLowerCase())
    }

    updateFinalWord()
  }

  return (
    <div onClick={() => inputElement.current.focus()} style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <input ref={inputElement} autoFocus onKeyUp={e => handleKeyPresses(e)} style={{border: '1px solid red', height: '100px', position: 'absolute', outline: 'none', caretColor: 'transparent', color: '#000', opacity: 0.5, top: '100px', display: 'block'}} />
      <div style={{border: '1px solid red', width: '610px', height: '150px', position: 'relative'}}>
        <BoardSVG />

        {charStates.map(obj => {
          return (<MoveableLetter key={obj.id} id={obj.id} 
            positionX={obj.positionX} positionY={obj.positionY} character={obj.char} 
            charStates={charStates}  setCharStates={setCharStates}
            inputElement={inputElement} setFinalWord={setFinalWord}
            />
        )})}
      </div>
    </div>
  )
}
