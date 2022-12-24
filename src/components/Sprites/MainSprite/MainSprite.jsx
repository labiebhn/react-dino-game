import React, { useState, useEffect, useCallback } from 'react';
import { Sprite, SpriteDeadEnemy, SpriteDinoStay, SpriteDinoWalk } from '../../../assets/characters';
import { FRAME_SPRITE } from '../../../constants';
import './MainSprite.scss';

function MainSprite({ move, keyCode, speed, jump, enemyTouched, enemyDead, gameOver, onJumpEnd, onDead }) {
  const [position, setPosition] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [frame, setFrame] = useState(FRAME_SPRITE);
  const [jumped, setJumped] = useState(false);
  const [jumpEnd, setJumpEnd] = useState(false);
  const jumpFrame = frame * 1.5;

  useEffect(() => {
    setTimeout(move ? handleMove : setPosition(0), speed);
  });

  useEffect(() => {
    handleJump();
  }, [jump, jumpFrame]);

  useEffect(() => {
    if (jumpEnd) {
      let isEnemyDead = false;
      if (enemyTouched) {
        isEnemyDead = true;
      }
      onJumpEnd?.(isEnemyDead);
      setJumpEnd(false);
    }
  }, [jumpEnd, enemyTouched]);

  useEffect(() => {
    handleDead();
  }, [jump, enemyTouched]);

  const handleMove = () => {
    let spriteWidth = -(frame * 5);
    if (keyCode === 37 || keyCode === 65) {
      setRotate(180);
      setPosition(position >= 0 ? spriteWidth : position + frame);
    }
    if (keyCode === 39 || keyCode === 68) {
      setRotate(0);
      setPosition(position <= spriteWidth ? 0 : position - frame);
    }
  }

  const handleJump = () => {
    if (jump) {
      setJumped(jump);
      setTimeout(() => {
        setJumped(false);
        setTimeout(() => {
          setJumpEnd(true);
        }, jumpFrame * 2)
      }, jumpFrame * 2);
    }
  }

  const handleDead = () => {
    if (enemyTouched && !jump && !enemyDead) {
      onDead?.();
    }
  }

  return (
    <div className="sprite-container" style={{
      transform: `translate(0, ${jumped ? -jumpFrame : 0}px)`
    }}>
      {gameOver ? (
        <div className="sprite">
          <img src={SpriteDeadEnemy} style={{
            transform: `rotateY(${180}deg)`
          }} />
        </div>
      ) : (
        <div className="sprite" style={{
          transform: `translateX(${position}px)`,
        }}>
          <img src={move ? SpriteDinoWalk : SpriteDinoStay} style={{
            transform: `rotateY(${rotate}deg)`
          }} />
        </div>
      )}
    </div>
  );
}

export default MainSprite;