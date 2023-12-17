import React, { useEffect } from 'react'
import { useState } from 'react'
import BoardSVG from '../components/BoardSVG.js'
import Letter from '../components/MoveableLetter.js'
import { motion, spring } from 'framer-motion'

// Going back to simple exmaple of framer-motion

function Letter2(props) {
  const styles = {
    width: '50px', height: '50px', 
    backgroundColor: 'red', 
    position: 'absolute',
    textAlign: 'center',
    display: 'grid',
    placeItems: 'center',
    fontSize: 'x-large',
    cursor: 'pointer',
    left: props.xLeft[0] + "px",
    top: "0px",
  }
  const springMotion = {
    type: "spring",
    stiffness: 700,
    damping: 100,
  };

  return (
    <motion.div style={styles} layout motion={springMotion}>
      A
    </motion.div>
  )
}

export default function Game() {
  const [xLeft, setXLeft] = useState([0])

  return (
    <div onClick={() => setXLeft([xLeft[0]+30])} style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <div style={{border: '1px solid red', width: '610px', height: '150px', position: 'relative'}}>
        <Letter2 xLeft={xLeft} />
      </div>
    </div>
  )
}
