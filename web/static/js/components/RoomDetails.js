import React from 'react'

const RoomDetails = () => {
  return (
    <div id="main-details">
      <div id="messages">
        <h2>General</h2>
        <div><strong>StevenNunez:</strong>Emmet is dope</div>
        <div><strong>Devin:</strong>U RITE</div>
        <div><strong>StevenNunez:</strong>:-|</div>
      </div>
      <div id="new-message">
        <textarea rows="2" />
        <button>Submit</button>
      </div>
    </div>
  )
}

export default RoomDetails
