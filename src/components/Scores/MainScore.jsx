import React from 'react'
import './MainScore.scss';

const MainScore = ({score}) => {
  return (
    <div id="MainScore">
      <h4>Score</h4>
      <h1>{score || 0}</h1>
    </div>
  )
}

export default MainScore