import React, { useEffect, useState } from 'react'
import { motion, spring } from 'framer-motion'

export default function MoveableLetter(props) {
  const styles = {
    width: '40px', height: '40px', 
    backgroundColor: 'red', 
    position: 'absolute',
    textAlign: 'center',
    display: 'grid',
    placeItems: 'center',
    fontSize: 'x-large',
    cursor: 'pointer',
    left: props.positionX + "px",
    top: props.positionY + "px",
  }

  const springMotion = {
    type: "spring",
    stiffness: 700,
    damping: 100,
  };

  const moveLetterUpOnSelfClickUp = () => {
    if (props.positionY === 80) { // If this fails, the letter clicked is not in the bottom row
      const topRow = props.charStates.filter(obj => obj.positionY === 0)
      const newXCoord = topRow.length * 50
      const newCharStates = [...props.charStates]
      newCharStates[props.id].positionX = newXCoord
      newCharStates[props.id].positionY = 0
      props.setCharStates(newCharStates)
    }
  }

  const updateFinalWord = () => {
    const topRow = props.charStates.filter(charObj => charObj.positionY === 0).sort((a,b) => a.positionX - b.positionX)
    var newFinalWord = ''
    if (topRow.length !== 0) {
      topRow.forEach(charObj => {
        newFinalWord += charObj.char
      });
    }
    props.setFinalWord(newFinalWord)
  }

  const handleClick = e => {
    moveLetterUpOnSelfClickUp()
    updateFinalWord()
    props.inputElement.current.focus() // Make game, keyboard main again
  }

  return (
    <motion.div onClick={e => handleClick(e)} layout transition={springMotion} style={styles}>
      {props.character.toUpperCase()}
    </motion.div>
  )
}
