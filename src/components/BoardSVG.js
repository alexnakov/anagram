import React from 'react'

export default function BoardSVG() {

  const squareColour = "rgb(250, 170, 246)"

  return (
    <svg style={{zIndex: '-2'}} width="350px" height="150px">
      {/* This is is the lightbrown big rect */}
      <rect width="350" height="150" fill="rgb(232, 152, 82)" style={{zIndex: '-2'}}></rect>

      {/* The following are the small pink rects */}
      <rect x="0" width="50" height="50" fill={squareColour} style={{zIndex: "-1"}}></rect>
      <rect x="100" width="50" height="50" fill={squareColour} style={{zIndex: "-1"}}></rect>
      <rect x="200" width="50" height="50" fill={squareColour} style={{zIndex: "-1"}}></rect>
      <rect x="300" width="50" height="50" fill={squareColour} style={{zIndex: "-1"}}></rect>
      
      <rect y="100" x="0" width="50" height="50" fill={squareColour} style={{zIndex: "-1"}}></rect>
      <rect y="100" x="100" width="50" height="50" fill={squareColour} style={{zIndex: "-1"}}></rect>
      <rect y="100" x="200" width="50" height="50" fill={squareColour} style={{zIndex: "-1"}}></rect>
      <rect y="100" x="300" width="50" height="50" fill={squareColour} style={{zIndex: "-1"}}></rect>
    </svg>
  )
}
