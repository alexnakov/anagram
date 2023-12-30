import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import BoardSVG from '../components/BoardSVG.js'
import MoveableLetter from '../components/MoveableLetter.js'
import { words } from '../words.js' // File w correct answers
import '../Css/Game.css'

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
      id: i, char: charArray[i], positionX: 50*i, positionY: 80, 
    })
  }

  return arrayOfMaps
}

const doesLetterOccupyTheseCoords = (arrCharObjects, x, y) => {
  return arrCharObjects.some(charObj => charObj.positionX === x && charObj.positionY === y)
}

function popRandomElement(arr) {
  if (arr.length === 0) { return null; }

  const randomIndex = Math.floor(Math.random() * arr.length);
  const poppedElement = arr.splice(randomIndex, 1)[0];
  return poppedElement;
}

const nineRandomLetters = generateNRandomLetters(9)
const arrayOfMapsFromChars = createArrayOfMapsfromChars(nineRandomLetters)

export default function Game() {
  const [finalWord, setFinalWord] = useState('')
  const [charStates, setCharStates] = useState(arrayOfMapsFromChars)
  const inputElement = useRef()

  useEffect(() => {
    inputElement.current.focus()

    return () => { inputElement.current.focus() }
  }, [])

  const moveLetterDownOnBackspace = () => {
    const newCharStates = [...charStates]
    const topRow = charStates.filter(charObj => charObj.positionY === 0).sort((a, b) => a.positionX - b.positionX)
    if (topRow.length !== 0) {
      const charObjToMove = topRow[topRow.length - 1] // Top row with highest X coord
      for (let i = 0; i < 9; i++) {
        if (!doesLetterOccupyTheseCoords(charStates, i*50, 80)) {
          // Checks whether letter occupies X coords at the bottom row

          charObjToMove.positionX = 50*i // the un-occupied position now becomes line 56's position
          charObjToMove.positionY = 80
          newCharStates[charObjToMove.id] = charObjToMove
          setCharStates(newCharStates)
          return;
        }
      }
    }
  
  }

  const moveLetterUpOnKeyPress = (keyPressed) => {
    const charStatesDuplicateSorted = [...charStates].sort((a,b) => a.positionX - b.positionX)
    const lowestBottomRowLetterDuplicate = charStatesDuplicateSorted.find(charObj => charObj.positionY === 80 && charObj.char === keyPressed)
    if (lowestBottomRowLetterDuplicate == undefined) { return; }
    const topRowLength = charStates.filter(charObj => charObj.positionY === 0).length
    const newXCoord = topRowLength * 50
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

  const handleShuffleBtn = () => {
    const topRow = charStates.filter(charObj => charObj.positionY === 0)
    const bottomRow = charStates.filter(charObj => charObj.positionY === 80)
    if (bottomRow.length === 0) { return; }
    const xCoords = []
    for (let i = 0; i < bottomRow.length; i++) {
      xCoords.push(bottomRow[i].positionX)
    }
    for (let i = 0; i < bottomRow.length; i++) {
      bottomRow[i].positionX = popRandomElement(xCoords)
    }

    const combinedRows = [...topRow, ...bottomRow].sort((a,b) => a.id - b.id)
    setCharStates(combinedRows)
    inputElement.current.focus()
  }

  return (
    <div onClick={() => inputElement.current.focus()} className='game-page-bg'>
      <input className='input-func-box' ref={inputElement} autoFocus onKeyUp={e => handleKeyPresses(e)} />
      <div className='game-stage-container'>
        <h1>Anagram Magic</h1>
        <div className='player-clock-container'>
          <div className='player-card left'></div>
          <div className='clock-banner'></div>
          <div className='player-card right'></div>
        </div>

        <div style={{display: 'flex', margin: '25px 0', height: '45px', alignItems: 'center', justifyContent: 'space-around'}}>
          <h2>Find the longest word!!!</h2>
        </div>
      
        <div className='board-btns-flex-container'>
          <div className='board' style={{border: '1px solid red', width: '440px', height: '120px', position: 'relative'}}>
            <BoardSVG />

            {charStates.map(obj => {
              return (<MoveableLetter key={obj.id} id={obj.id} 
                positionX={obj.positionX} positionY={obj.positionY} character={obj.char} 
                charStates={charStates}  setCharStates={setCharStates}
                inputElement={inputElement} setFinalWord={setFinalWord}
                />
            )})}
          </div>
          <div className='black-btns-container'>
            {
              finalWord.length > 0 ? 
                <div className='btn-wrapper' onClick={() => {moveLetterDownOnBackspace(); updateFinalWord()}}>Backspace</div> 
                  : 
                <div style={{width: '150px', height: '40px'}}></div>
            }
            <div onClick={() => handleShuffleBtn()} className='btn-wrapper'>Shuffle</div>
          </div>
        </div>

        <div className='done-btn-container'>
          <button>I'm Done</button>
        </div>
      </div>
    </div>
  )
}
