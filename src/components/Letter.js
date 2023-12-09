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

  useEffect(() => {
    if (props.letterText === props.currentK) {
      if (props.n < 4 && pos[1] == 100) {
        setPos([props.n * 100, 0])
        props.setN(props.n + 1)
      } else if (pos[1] == 0) {
        setPos([0, 100])
        props.setN(props.n - 1)
      }
    }
  }, [props.currentK])

  return (
    <motion.div layout transition={springMotion} style={styles}>
      {props.letterText}
    </motion.div>
  )
}
