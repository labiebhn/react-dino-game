import React, { useState, useEffect, useCallback } from 'react';
import { Sprite, SpriteDinoStay, SpriteDinoWalk } from '../../../assets/characters';
import './MainSprite.scss';

function MainSprite({ move, keyCode, speed, jump, onJumpEnd }) {

  

  const [position, setPosition] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [frame, setFrame] = useState(100);
  const [jumped, setJumped] = useState(false);
  const jumpFrame = frame * 1.5;

  useEffect(() => {
    setTimeout(move ? handleMove : setPosition(0), speed);
  });

  
  useEffect(() => {
    handleJump();
  }, [jump, jumpFrame]);

  const handleJump = () => {
    if (jump) {
      setJumped(jump);
      setTimeout(() => {
        setJumped(false);
        setTimeout(() => {
          onJumpEnd?.();
        }, jumpFrame)
      }, jumpFrame * 2);
    }
  }
  
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

  return (
    <div className="sprite-container" style={{
      transform: `translate(0, ${jumped ? -jumpFrame : 0}px)`
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