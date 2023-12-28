import React from 'react'

export default function BoardSVG() {

  const squareColour = "rgb(250, 170, 246)"

  return (
    <svg style={{zIndex: '-2'}} width="440px" height="140px">
      {/* This is is the lightbrown big rect */}
      <rect width="440px" height="140" fill="rgb(232, 152, 82)" style={{zIndex: '-2'}}></rect>

      {/* The following are removthe small pink rects */}
      {[0,1,2,3,4,5,6,7,8].map(v => {
        return (<rect key={v} x={50*v} width="40" height="40" fill={squareColour} style={{zIndex: "-1"}}></rect>)
      })}

      {[0,1,2,3,4,5,6,7,8].map(v => {
        return (<rect key={v} x={50*v} y="100" width="40" height="40" fill={squareColour} style={{zIndex: "-1"}}></rect>)
      })}
    </svg>
  )
}
