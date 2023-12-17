import React, { useEffect } from 'react'
import { useState } from 'react'
import BoardSVG from '../components/BoardSVG.js'
import Letter from '../components/Letter.js'
import useKeyPress from 'react-use-keypress'
import { motion, spring } from 'framer-motion'

// Going back to simple exmaple of framer-motion

export default function Game() {
  const [x, setX] = useState([0])

  const styles = {
    width: '50px', height: '50px', 
    backgroundColor: 'red', 
    position: 'absolute',
    textAlign: 'center',
    display: 'grid',
    placeItems: 'center',
    fontSize: 'x-large',
    cursor: 'pointer',
    left: x + "px",
    top: "0px",
  }
  const springMotion = {
    type: "spring",
    stiffness: 700,
    damping: 100,
  };

  const handleClick = e => {
    e.preventDefault()
    let currentX = x
    let newX = [Number(currentX[0]) + 20]
    console.log(newX)
    setX(newX)
  }

  useKeyPress(['a'], e => {

    setX(x+20)
  })


  return (
    <div style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <div style={{border: '1px solid red', width: '610px', height: '150px', position: 'relative'}}>
        <motion.div onClick={e => handleClick(e)} style={styles}
          layout motion={springMotion}>
          A
        </motion.div>
      </div>
    </div>
  )
}
