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

  const handleClick = e => {
    if (props.positionY === 100) {
      const topRow = props.charStates.filter(obj => obj.positionY === 0)
      const newXCoord = topRow.length * 70
      const newCharStates = [...props.charStates]
      newCharStates[props.id].positionX = newXCoord
      newCharStates[props.id].positionY = 0
      props.setCharStates(newCharStates)
    }
  }

  return (
    <motion.div onClick={e => handleClick(e)} layout transition={springMotion} style={styles}>
      {props.character.toUpperCase()}
    </motion.div>
  )
}
