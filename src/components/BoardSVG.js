import React from 'react'

export default function BoardSVG() {

  const squareColour = "rgb(250, 170, 246)"

  return (
    <svg style={{zIndex: '-2'}} width="610px" height="150px">
      {/* This is is the lightbrown big rect */}
      <rect width="610" height="150" fill="rgb(232, 152, 82)" style={{zIndex: '-2'}}></rect>

      {/* The following are removthe small pink rects */}
      {[0,1,2,3,4,5,6,7,8].map(v => {
        return (<rect x={70*v} width="50" height="50" fill={squareColour} style={{zIndex: "-1"}}></rect>)
      })}

      {[0,1,2,3,4,5,6,7,8].map(v => {
        return (<rect x={70*v} y="100" width="50" height="50" fill={squareColour} style={{zIndex: "-1"}}></rect>)
      })}
    </svg>
  )
}
