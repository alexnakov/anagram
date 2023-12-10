import React, { useEffect, useState } from 'react'
import { motion, spring } from 'framer-motion'

export default function Letter(props) {
  const [pos, setPos] = useState([props.x, props.y])

  const styles = {
    width: '50px', height: '50px', 
    backgroundColor: 'red', 
    position: 'absolute',
    textAlign: 'center',
    display: 'grid',
    placeItems: 'center',
    fontSize: 'x-large',
    left: pos[0] + "px",
    top: pos[1] + "px",
  }

  const springMotion = {
    type: "spring",
    stiffness: 700,
    damping: 100,
  };


  useEffect(() => {
    convertLayoutArrToXYPos(props.layoutArr)
  }, [props.layoutArr])

  // Will change the pos state depending on the layoutArr
  // Should only be using the setter function
  const convertLayoutArrToXYPos = layoutArr => {
    if (layoutArr[1].includes(props.letterText)) {
      setPos([layoutArr[1].indexOf(props.letterText) * 70, 100])
    } else if (layoutArr[0].includes(props.letterText)) {
      setPos([layoutArr[0].indexOf(props.letterText) * 70, 0])
    }
  }

  return (
    <motion.div layout transition={springMotion} style={styles}>
      {props.letterText}
    </motion.div>
  )
}
