import React, { useEffect, useState } from 'react'
import { motion, spring } from 'framer-motion'

export default function MoveableLetter({left, character, id, canMoveUpArray, setCanMoveUpArray, nextFreeTopSpot, setNextFreeTopSpot, arrayOfFreeBottomSpots, setArrayOfFreeBottomSpots, charactersArray}) {
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
    const modifiedArray = [...canMoveUpArray]
    modifiedArray[id] = bool
    setCanMoveUpArray(modifiedArray)
  }

  const addToArrayOfBottomFreeSpots = xPosition => {
    const modifiedArray = [...arrayOfFreeBottomSpots]
    modifiedArray.push(Math.round(xPosition / 70))
    modifiedArray.sort((a, b) => a - b) // Ascending order array
    setArrayOfFreeBottomSpots(modifiedArray)
  }

  const handleKeyPress = (e) => {
    if (e.key === character && canMoveUpArray[id] && nextFreeTopSpot < 9 && position[1] === 100) {
      addToArrayOfBottomFreeSpots(position[0])
      setPosition([nextFreeTopSpot * 70, 0])
      setNextFreeTopSpot(nextFreeTopSpot + 1)
      changeMobilityTo(false)
    }
    else if (e.key === 'Backspace' && (nextFreeTopSpot-1) * 70 === position[0] && position[1] === 0) {
      setPosition([arrayOfFreeBottomSpots[0] * 70, 100])
      var modifiedNextFreeBottomSpotArray = [...arrayOfFreeBottomSpots]
      const removedFirstFreeSpotFromBottomArray = modifiedNextFreeBottomSpotArray.shift()
      setArrayOfFreeBottomSpots(modifiedNextFreeBottomSpotArray)
      setNextFreeTopSpot(nextFreeTopSpot - 1)
    }
    else if (e.key == '1') {
      console.log(canMoveUpArray)
    }
    else {
      return
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress)
    return () => {
      window.removeEventListener('keyup', handleKeyPress)
    };
  }, [canMoveUpArray])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      changeMobilityTo(true)
    }, 1) // The next duplicates get freed almost immediately

    return () => {
      clearTimeout(timeoutId)
    }
  }, [position, canMoveUpArray])

  return (
    <motion.div layout transition={springMotion} style={styles}>
      {character.toUpperCase()} {id}
    </motion.div>
  )
}
