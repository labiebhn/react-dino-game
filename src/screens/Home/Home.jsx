import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SoundSlimeDead } from '../../assets/sounds';
import GreenGround from '../../components/Grounds/GreenGround/GreenGround';
import MainScore from '../../components/Scores/MainScore';
import EnemySprite from '../../components/Sprites/MainSprite/EnemySprite';
import MainSprite from '../../components/Sprites/MainSprite/MainSprite';
import { ENEMY_GAP_DEFAULT, ENEMY_UNIT, SOCRE_UNIT, SPEED_DEFAULT, SPEED_UNIT } from '../../constants';
import { getRandomInt, useWindowDimensions } from '../../utils/helpers';
import './Home.scss';

function Home(props) {
  const homeRef = useRef(null);
  const soundSlimeDead = new Audio(SoundSlimeDead);
  const { width } = useWindowDimensions();

  const [key, setKey] = useState(null);
  const [move, setMove] = useState(false);
  const [level, setLevel] = useState(0);
  const [speed, setSpeed] = useState(SPEED_DEFAULT);
  const [jump, setJump] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [enemyTouched, setEnemyTouched] = useState(false);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);

  const keyMove = [37, 39, 68, 65];
  const keyJump = [38, 87];

  useEffect(() => {
    if (gameOver) {
      setMove(false);
    }
  }, [gameOver]);

  useEffect(() => {
    let isAllPass = enemies?.filter(item => !item?.isPass);
    if (isAllPass?.length < 1) {
      handleSummonEnemy();
    }
  }, [enemies]);

  useEffect(() => {
    if (level) {
      handleLevelUpgrade();
    }
  }, [level]);

  const handleLevelUpgrade = useCallback(() => {
    if (speed > SPEED_UNIT) {
      setSpeed(prevState => prevState - SPEED_UNIT);
    }
  }, [speed]);

  const getInitialEnemyPosition = (data, index, level) => {
    let result = 0;
    const prevPosition = data?.[index - 1]?.initPosition;
    const initPosition = prevPosition ? width / 3 : width;
    let gap = ENEMY_GAP_DEFAULT - (SPEED_UNIT * level);
    if (gap <= 100) {
      gap = ENEMY_GAP_DEFAULT;
    }
    const minGap = Math.round(prevPosition ? prevPosition + gap : initPosition);
    const maxGap = Math.round(prevPosition ? minGap + initPosition : minGap + gap);
    result = getRandomInt(minGap, maxGap);
    return Math.round(result);
  }

  const handleSummonEnemy = useCallback(() => {
    let payload = [];
    let enemiesUnit = ENEMY_UNIT;
    for (let i = 0; i < enemiesUnit; i++) {
      let position = getInitialEnemyPosition(payload, i, level);
      payload.push({
        id: `${i}-${getRandomInt(100, 999)}`,
        isDead: false,
        isPass: false,
        initPosition: position,
      });
    }
    setEnemies(payload);
    setLevel(level + 1);
  }, [enemies, level]);

  const handleEnemyKilled = (isEnemyDead, enemyIndex) => {
    if (isEnemyDead) {
      soundSlimeDead.play();
      setEnemies((prevState => {
        let enemiesNew = [...prevState];
        enemiesNew[enemyIndex].isDead = true;
        return enemiesNew;
      }));
      setScore(prevState => prevState + SOCRE_UNIT);
    };
  }

  const handleEnemyPass = (index) => {
    setEnemies(prevState => {
      let enemiesNew = [...prevState];
      enemiesNew[index].isPass = true;
      return enemiesNew;
    });
  }

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
        <div className="header">
          <div />
          <MainScore score={score} />
        </div>
        {enemies?.map((item, index) => {
          return (
            <EnemySprite
              key={item?.id}
              move={move}
              keyCode={key}
              jump={jump}
              speed={speed}
              initPosition={item?.initPosition}
              isPass={item?.isPass}
              isDead={item?.isDead}
              onEnemyPass={() => handleEnemyPass(index)}
              onEnemyTouch={(touch) => setEnemyTouched(touch ? index : false)}
            />
          )
        })}
        <MainSprite
          keyCode={key}
          move={move}
          enemyTouched={enemyTouched}
          enemyDead={typeof enemyTouched === 'number' ? enemies?.[enemyTouched]?.isDead : false}
          speed={speed}
          jump={jump}
          gameOver={gameOver}
          onDead={() => setGameOver(true)}
          onJumpEnd={(isEnemyDead, enemyIndex) => {
            handleEnemyKilled(isEnemyDead, enemyIndex);
            setJump(false);
          }}
        />
      </div>
    </div>
  );
}

export default Home;