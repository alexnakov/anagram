import React from 'react'

export default function BoardSVG() {
  return (
    <svg style={{zIndex: '-2'}}>
      <rect width="150" height="150" fill="rgb(222, 182, 82)" style={{zIndex: '-2'}}></rect>
      <rect width="50" height="50" fill="rgb(209, 65, 116)" style={{zIndex: "-1"}}></rect>
      <rect x="100" width="50" height="50" fill="rgb(209, 65, 116)" style={{zIndex: "-1"}}></rect>
      <rect x="" y="100" width="50" height="50" fill="rgb(209, 65, 116)" style={{zIndex: "-1"}}></rect>
      <rect x="100" y="100" width="50" height="50" fill="rgb(209, 65, 116)" style={{zIndex: "-1"}}></rect>
    </svg>
  )
}
