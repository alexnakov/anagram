import React from 'react'
import { useState } from 'react'
import { motion, spring } from 'framer-motion'


export default function Game() {
  const [boxHeight, setBoxHeight] = useState(0)
  const [boxWidth, setBoxWidth] = useState(0)
  const [clicked, setClicked] = useState(true)

  const boxStyle = {width: '50px', height: '50px', backgroundColor: 'green', position: 'absolute',
    top: boxHeight + "px",
    left: boxWidth + "px",
  }

  function moveBox(e) {
    e.preventDefault()
    if (!clicked) {
      setBoxHeight(100)
      setBoxWidth(100)
    } else {
      setBoxHeight(0)
      setBoxWidth(0)
    }
    setClicked(!clicked)
  }

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 100,
  };
  
  return (
    <div onClick={e => moveBox(e)} style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <div style={{border: '1px solid red', width: '500px', height: '300px', position: 'relative'}}>
        <motion.div className='box' layout transition={spring} style={boxStyle}></motion.div>
      </div>
    </div>
  )
}
