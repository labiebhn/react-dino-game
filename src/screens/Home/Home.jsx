import React, { useEffect, useState, useRef } from 'react';
import { IconLogbox } from '../../assets/icons';
import { OrnamentFireball } from '../../assets/oranaments';
import GreenGround from '../../components/Grounds/GreenGround/GreenGround';
import EnemySprite from '../../components/Sprites/MainSprite/EnemySprite';
import MainSprite from '../../components/Sprites/MainSprite/MainSprite';
import './Home.scss';

function Home(props) {
  const homeRef = useRef(null);

  const [key, setKey] = useState(null);
  const [move, setMove] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [jump, setJump] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [enemyTouched, setEnemyTouched] = useState(false);
  const [enemyDead, setEnemyDead] = useState(false);

  const keyMove = [37, 39, 68, 65];
  const keyJump = [38, 87];

  useEffect(() => {
    if (gameOver) {
      setMove(false);
    }
  }, [gameOver]);

  return (
    <div
      id="Home"
      ref={homeRef}
      onKeyDown={(e) => {
        // console.log('keydown: ', e.keyCode);
        if (!gameOver) {
          setMove(keyMove.includes(e.keyCode) ? true : move);
          setKey(keyMove.includes(e.keyCode) ? e.keyCode : key);
          setJump(keyJump.includes(e.keyCode) ? true : jump)
        }
      }}
      onKeyUp={(e) => {
        // console.log('keyup: ', e.keyCode);
        setMove(keyMove.includes(e.keyCode) ? false : move);
      }}
      tabIndex="0"
    >
      <div className="canvas">
        <GreenGround
          move={move}
          keyCode={key}
          speed={speed}
        />
        <img src={OrnamentFireball} width={80} />
        <EnemySprite
          move={move}
          keyCode={key}
          jump={jump}
          speed={speed}
          isDead={enemyDead}
          onEnemyTouch={setEnemyTouched}
        />
        <MainSprite
          keyCode={key}
          move={move}
          enemyTouched={enemyTouched}
          enemyDead={enemyDead}
          speed={speed}
          jump={jump}
          gameOver={gameOver}
          onDead={() => setGameOver(true)}
          onJumpEnd={(isEnemyDead) => {
            if (isEnemyDead) setEnemyDead(isEnemyDead);
            setJump(false);
          }}
        />
      </div>
    </div>
  );
}

export default Home;