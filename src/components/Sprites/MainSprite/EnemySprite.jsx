import React, { useEffect, useState } from "react";
import { SpriteDeadEnemy, SpriteSlimeEnemy, SpriteWormEnemy } from "../../../assets/characters";
import { useWindowDimensions } from "../../../utils/helpers";
import "./MainSprite.scss";

const EnemySprite = ({ move, keyCode, speed, isDead, onEnemyTouch }) => {
  const { width } = useWindowDimensions();
  const initPosition = width / 3;
  const [position, setPosition] = useState(initPosition);
  const [frame, setFrame] = useState(speed / 5);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setTimeout(move ? handleMove : null, speed);
  });

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
  }, [position])

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
