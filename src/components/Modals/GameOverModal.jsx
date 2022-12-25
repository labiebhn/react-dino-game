import React from 'react'
import { IconGithub } from '../../assets/icons';
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
        <div className="content-footer">
          <a href="https://github.com/labiebhn" target={'_blank'} className='github'>
            <img src={IconGithub} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default GameOverModal