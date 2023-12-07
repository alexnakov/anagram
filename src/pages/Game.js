import React from 'react'
import { useState, useEffect } from 'react'
import BoardSVG from '../components/BoardSVG.js'
import { motion, spring } from 'framer-motion'


export default function Game() {
  // Will we index things with 0 to start with
  const [nextFreeTopBoxPos, setNextFreeTopBoxPos] = useState([0, 0])
  const [nextFreeBottomBoxPos, setNextFreeBottomBoxPos] = useState([0, 0])


  const [box1Pos, setBox1Pos] = useState([0, 100])
  const [box2Pos, setBox2Pos] = useState([100, 100])
  const [box3Pos, setBox3Pos] = useState([200, 100])
  const [box4Pos, setBox4Pos] = useState([300, 100])

  const commonStyles = {
    width: '50px', height: '50px', 
    backgroundColor: 'red', 
    position: 'absolute',
    textAlign: 'center',
  }
  const box1Style = {
    ...commonStyles,
    top: box1Pos[1] + "px",
    left: box1Pos[0] + "px",
  }
  const box2Style = {
    ...commonStyles,
    top: box2Pos[1] + "px",
    left: box2Pos[0] + "px",
  }
  const box3Style = {
    ...commonStyles,
    top: box3Pos[1] + "px",
    left: box3Pos[0] + "px",
  }
  const box4Style = {
    ...commonStyles,
    top: box4Pos[1] + "px",
    left: box4Pos[0] + "px",
  }

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true)
  }, [])

  const detectKeyDown = e => {
    console.log(e.key)
  }

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 100,
  };

  const excite = (e) => {
    e.preventDefault()
    console.log('p')
    console.log(e.which || e.keyCode || 0)
  }
  
  return (
    <div style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <div style={{border: '1px solid red', width: '350px', height: '150px', position: 'relative'}}>
        <BoardSVG />
        <motion.div className='box' layout transition={spring} style={box1Style}>A</motion.div>
        <motion.div className='box' layout transition={spring} style={box2Style}>N</motion.div>
        <motion.div className='box' layout transition={spring} style={box3Style}>E</motion.div>
        <motion.div className='box' layout transition={spring} style={box4Style}>M</motion.div>
      </div>
    </div>
  )
}
