import React, { useEffect, useState } from "react";
import { SpriteDeadEnemy, SpriteSlimeEnemy } from "../../../assets/characters";
import "./MainSprite.scss";

const EnemySprite = ({ move, keyCode, speed, isDead, isPass, initPosition, onEnemyPass, onEnemyTouch }) => {
  const [position, setPosition] = useState(initPosition);
  const [frame] = useState(11.9);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setTimeout(move ? handleMove : null, speed);
  });

  useEffect(() => {
    return () => {
      setPosition(0);
      setTouched(false);
    }
  }, []);

  useEffect(() => {
    onEnemyTouch?.(touched);
  }, [touched]);

  useEffect(() => {
    const positionDinoTouched = 32;
    const positionDinoPassed = -58;
    if (position >= positionDinoPassed && position <= positionDinoTouched) {
      setTouched(true);
    } else {
      setTouched(false);
    }
    // Enemy pass away
    const postionEnemyPassed = -151;
    if (position <= postionEnemyPassed && !isPass) {
      onEnemyPass?.();
    }
  }, [position, isPass])

  const handleMove = () => {
    if (keyCode === 37 || keyCode === 65) {
      setPosition(position + frame);
    }
    if (keyCode === 39 || keyCode === 68) {
      setPosition(position - frame);
    }
  }

  return (
    <div className="sprite-container sprite-enemy" style={{
      transform: `translateX(${position}px)`,
    }}>
      <div className={`sprite ${isDead ? 'dead' : ''}`}>
        <img src={isDead ? SpriteDeadEnemy : SpriteSlimeEnemy} />
      </div>
    </div>
  );
};

export default EnemySprite;