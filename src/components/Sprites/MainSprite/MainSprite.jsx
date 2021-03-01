import React, { useState, useEffect } from 'react';
import { Sprite, SpriteDinoStay, SpriteDinoWalk } from '../../../assets/characters';
import './MainSprite.scss';

function MainSprite({ move, keyCode, speed, jump }) {

  // STATE
  const [position, setPosition] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [frame, setFrame] = useState(100);

  const handleMove = () => {
    let spriteWidth = -(frame * 5);
    if(keyCode === 37 || keyCode === 65) {
      setRotate(180);
      setPosition(position >= 0 ? spriteWidth : position + frame);
    } 
    if(keyCode === 39 || keyCode === 68) {
      setRotate(0);
      setPosition(position <= spriteWidth ? 0 : position - frame);
    }
  }

  useEffect(() => {
    setTimeout(move ? handleMove : setPosition(0), speed);
  });

  return (
    <div className="sprite-container" style={{
      transform: `translate(0, ${jump ? -60 : 0}px)`
    }}>
      <div className="sprite" style={{
        transform: `translateX(${position}px)`,
      }}>
        <img src={move ? SpriteDinoWalk : SpriteDinoStay} style={{
          transform: `rotateY(${rotate}deg)`
        }} />
      </div>
    </div>
  );
}

export default MainSprite;