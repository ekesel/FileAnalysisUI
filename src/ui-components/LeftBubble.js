import React from 'react'

const LeftBubble = (props) => {
  return (
    <div className='messageContainer'>
        <span>{props.msg}</span>
    </div>
  )
}

export default LeftBubble