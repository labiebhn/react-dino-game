import React from 'react'
import './GameOverModal.scss';

const GameOverModal = ({score, onResetClick}) => {
  return (
    <div id="GameOverModal">
      <div className="content">
        <div className="content-info">
        <p>Game Over</p>
        <p>Score: {score || 0}</p>
        </div>
        <button onClick={onResetClick}>
          TRY AGAIN
        </button>
      </div>
    </div>
  )
}

export default GameOverModal