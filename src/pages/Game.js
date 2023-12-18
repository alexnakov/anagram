import React, { useEffect } from 'react'
import { useState } from 'react'
import BoardSVG from '../components/BoardSVG.js'
import MoveableLetter from '../components/MoveableLetter.js'
import useKeyPress from 'react-use-keypress'

export default function Game() {
  const charactersArray = ['a', 'b', 'c', 'b']
  const [canMoveArray, setCanMoveArray] = useState([true, true, true, false])
  const [nextFreeTopSpot, setNextFreeTopSpot] = useState(0)
  const [arrayOfFreeBottomSpots, setArrayOfFreeBottomSpots] = useState([])

  return (
    <div style={{width: '100vw', height: '100vh', display: 'grid', placeItems: 'center'}}>
      <div style={{border: '1px solid red', width: '610px', height: '150px', position: 'relative'}}>
        <BoardSVG />
        
        <MoveableLetter character={"a"} left={0} id={0} canMoveArray={canMoveArray} setCanMoveArray={setCanMoveArray} nextFreeTopSpot={nextFreeTopSpot} setNextFreeTopSpot={setNextFreeTopSpot} arrayOfFreeBottomSpots={arrayOfFreeBottomSpots} setArrayOfFreeBottomSpots={setArrayOfFreeBottomSpots} />
        <MoveableLetter character={"b"} left={70} id={1} canMoveArray={canMoveArray} setCanMoveArray={setCanMoveArray} nextFreeTopSpot={nextFreeTopSpot} setNextFreeTopSpot={setNextFreeTopSpot} arrayOfFreeBottomSpots={arrayOfFreeBottomSpots} setArrayOfFreeBottomSpots={setArrayOfFreeBottomSpots} />
        <MoveableLetter character={"c"} left={140} id={2} canMoveArray={canMoveArray} setCanMoveArray={setCanMoveArray} nextFreeTopSpot={nextFreeTopSpot} setNextFreeTopSpot={setNextFreeTopSpot} arrayOfFreeBottomSpots={arrayOfFreeBottomSpots} setArrayOfFreeBottomSpots={setArrayOfFreeBottomSpots} />
        <MoveableLetter character={"b"} left={210} id={3} canMoveArray={canMoveArray} setCanMoveArray={setCanMoveArray} nextFreeTopSpot={nextFreeTopSpot} setNextFreeTopSpot={setNextFreeTopSpot} arrayOfFreeBottomSpots={arrayOfFreeBottomSpots} setArrayOfFreeBottomSpots={setArrayOfFreeBottomSpots} />
      </div>
    </div>
  )
}
