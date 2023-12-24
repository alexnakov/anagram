import React, { useEffect, useState } from 'react'
import { motion, spring } from 'framer-motion'

export default function MoveableLetter(props) {
  const styles = {
    width: '50px', height: '50px', 
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

  const moveLetterUp = () => {
    if (props.positionY === 100) {
      const topRow = props.charStates.filter(obj => obj.positionY === 0)
      const newXCoord = topRow.length * 70
      const newCharStates = [...props.charStates]
      newCharStates[props.id].positionX = newXCoord
      newCharStates[props.id].positionY = 0
      props.setCharStates(newCharStates)
    }
  }

  const disableMoveUp = () => {
    const newCharStates = [...props.charStates]
    newCharStates[props.id].canMoveUp = false
  }

  const allowLetterToMoveBackDown = () => {
    const newCharStates = [...props.charStates]
    newCharStates[props.id].canMoveDown = true
  }

  const makeAllPreviousTopRowLetterNotMoveableDown = () => {
    const newCharStates = [...props.charStates]

    newCharStates.forEach(charObj => {
      if (charObj.id !== props.id) {
        charObj.canMoveDown = false
      }
    });

    props.setCharStates(newCharStates)
  }

  const enableNextSameCharToMoveUp = () => {
    const newCharStatesAscendingX = [...props.charStates].sort((a, b) => a.positionX - b.positionY)

    for (let i = 0; i < newCharStatesAscendingX.length; i++) {
      if (newCharStatesAscendingX[i].positionY == 100 && newCharStatesAscendingX[i].char == props.character) {
        newCharStatesAscendingX[i].canMoveUp= true
        break
      }
    }


    props.setCharStates(newCharStatesAscendingX.sort((a, b) => a.id - b.id))
  }

  const handleClick = e => {
    moveLetterUp()
    disableMoveUp()
    allowLetterToMoveBackDown()
    makeAllPreviousTopRowLetterNotMoveableDown()
    enableNextSameCharToMoveUp()
    props.inputElement.current.focus() // Make game, keyboard main again
  }

  return (
    <motion.div onClick={e => handleClick(e)} layout transition={springMotion} style={styles}>
      {props.character.toUpperCase()}
    </motion.div>
  )
}
