import React from 'react'
import { useState } from 'react'
import { motion, spring } from 'framer-motion'


export default function Game() {
  const [box1Height, setBox1Height] = useState(0)
  const [box1Width, setBox1Width] = useState(0)
  const [box2Height, setBox2Height] = useState(0)
  const [box2Width, setBox2Width] = useState(100)
  const [box3Height, setBox3Height] = useState(100)
  const [box3Width, setBox3Width] = useState(0)
  const [box4Height, setBox4Height] = useState(100)
  const [box4Width, setBox4Width] = useState(100)

  const [clicked, setClicked] = useState(false)

  // 1 Style object for all 4 boxes
  // const boxStyle = {
  //   width: '50px', height: '50px', 
  //   backgroundColor: 'green', 
  //   position: 'absolute',
  // }

  const box1Pos = {
    width: '50px', height: '50px', 
    backgroundColor: 'red', 
    position: 'absolute',
    top: box1Height + "px",
    left: box1Width + "px",
  }

  const box2Pos = {
    width: '50px', height: '50px', 
    backgroundColor: 'green', 
    position: 'absolute',
    top: box2Height + "px",
    left: box2Width + "px",
  }

  const box3Pos = {
    width: '50px', height: '50px', 
    backgroundColor: 'brown', 
    position: 'absolute',
    top: box3Height + "px",
    left: box3Width + "px",
  }

  const box4Pos = {
    width: '50px', height: '50px', 
    backgroundColor: 'orange', 
    position: 'absolute',
    top: box4Height + "px",
    left: box4Width + "px",
  }


  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 100,
  };

  function moveBoxes(e) {
    e.preventDefault()
    if (!clicked) {
      setBox1Height(100)
      setBox2Height(100)
      setBox3Height(0)
      setBox4Height(0)
    
      setBox1Width(100)
      setBox3Width(100)
      setBox2Width(0)
      setBox4Width(0)
    } else {
      setBox1Height(0)
      setBox2Height(0)
      setBox3Height(100)
      setBox4Height(100)
    
      setBox1Width(0)
      setBox3Width(0)
      setBox2Width(100)
      setBox4Width(100)
    }
    setClicked(!clicked)
  }
  
  return (
    <div onClick={e => moveBoxes(e)} style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <div style={{border: '1px solid red', width: '500px', height: '300px', position: 'relative'}}>
        <motion.div className='box' layout transition={spring} style={box1Pos}></motion.div>
        <motion.div className='box' layout transition={spring} style={box2Pos}></motion.div>
        <motion.div className='box' layout transition={spring} style={box3Pos}></motion.div>
        <motion.div className='box' layout transition={spring} style={box4Pos}></motion.div>
      </div>
    </div>
  )
}
