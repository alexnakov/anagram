import React, { useEffect, useState } from 'react'
import { motion, spring } from 'framer-motion'

export default function MoveableLetter({left, character, id, canMoveArray, setCanMoveArray, nextFreeTopSpot, setNextFreeTopSpot}) {
  const [position, setPosition] = useState([left, 100])

  const styles = {
    width: '50px', height: '50px', 
    backgroundColor: 'red', 
    position: 'absolute',
    textAlign: 'center',
    display: 'grid',
    placeItems: 'center',
    fontSize: 'x-large',
    cursor: 'pointer',
    left: position[0] + "px",
    top: position[1] + "px",
  }
  const springMotion = {
    type: "spring",
    stiffness: 700,
    damping: 100,
  };

  const changeMobilityTo = bool => {
    const modifiedArray = [...canMoveArray]
    modifiedArray[id] = bool
    setCanMoveArray(modifiedArray)
  }

  const handleKeyPress = (e) => {
    if (e.key === character && canMoveArray[id] && nextFreeTopSpot < 9 && position[1] === 100) {
      setPosition([nextFreeTopSpot * 70, 0])
      setNextFreeTopSpot(nextFreeTopSpot + 1)

      changeMobilityTo(false)
    }
    else if (e.key === 'Backspace' && (nextFreeTopSpot-1) * 70 === position[0] && position[1] === 0) {
      setPosition([0, 100])
      setNextFreeTopSpot(nextFreeTopSpot - 1)
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress)
    return () => {
      window.removeEventListener('keyup', handleKeyPress)
    };
  }, [canMoveArray])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      
      changeMobilityTo(true)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [position, canMoveArray])

  return (
    <motion.div layout transition={springMotion} style={styles}>
      {character} ({id})
    </motion.div>
  )
}
