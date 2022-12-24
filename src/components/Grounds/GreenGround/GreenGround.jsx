import React, { useState, useEffect } from 'react';
import { OrnamentGround } from '../../../assets/oranaments';
import './GreenGround.scss';

function GreenGround({ move, keyCode, speed }) {
  const [position, setPosition] = useState(0);
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    setTimeout(move ? handleMove : null, speed);
  });

  const handleMove = () => {
    let spriteWidth = -78;
    if(keyCode === 37 || keyCode === 65) {
      setPosition(position >= 0 ? spriteWidth : position + frame);
    } 
    if(keyCode === 39 || keyCode === 68) {
      setPosition(position <= spriteWidth ? 0 : position - frame);
    }
  }

  return (
    <div className="green-ground">
      <div className="ground" style={{
        transform: `translateX(${position}%)`
      }}>
        <img src={OrnamentGround} alt="" className="ground-img" />
        <img src={OrnamentGround} alt="" className="ground-img" />
      </div>
    </div>
  );
}

export default GreenGround;