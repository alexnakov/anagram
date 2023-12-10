import React, { useEffect, useState } from 'react'
import { motion, spring } from 'framer-motion'

export default function Letter(props) {
  const [pos, setPos] = useState([props.x, props.y])

  const styles = {
    width: '50px', height: '50px', 
    backgroundColor: 'red', 
    position: 'absolute',
    textAlign: 'center',
    left: pos[0] + "px",
    top: pos[1] + "px",
  }

  const springMotion = {
    type: "spring",
    stiffness: 700,
    damping: 100,
  };
  
  return (
    <motion.div layout transition={springMotion} style={styles}>
      {props.letterText}
    </motion.div>
  )
}
