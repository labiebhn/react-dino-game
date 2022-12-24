import React, { useEffect, useState, useRef } from 'react';
import { IconLogbox } from '../../assets/icons';
import { OrnamentFireball } from '../../assets/oranaments';
import GreenGround from '../../components/Grounds/GreenGround/GreenGround';
import MainSprite from '../../components/Sprites/MainSprite/MainSprite';
import './Home.scss';

function Home(props) {

  const [key, setKey] = useState(null);
  const [move, setMove] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [jump, setJump] = useState(false);
  const homeRef = useRef(null);
  
  const keyMove = [37, 39, 68, 65];

  return (
    <div 
      id="Home" 
      ref={homeRef} 
      onKeyDown={(e) => {
        console.log('keydown: ', e.keyCode);
        setMove(keyMove.includes(e.keyCode) ? true : move);
        setKey(keyMove.includes(e.keyCode) ? e.keyCode : key);
        setJump(e.keyCode === 38 ? true : jump)
      }}
      onKeyUp={(e) => {
        console.log('keyup: ', e.keyCode);
        setMove(keyMove.includes(e.keyCode) ? false : move);
        // setJump(e.keyCode === 38 ? false : jump)
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
        <MainSprite 
          keyCode={key}
          move={move}
          speed={speed}
          jump={jump}
          onJumpEnd={() => setJump(false)}
        />
      </div>
    </div>
  );
}

export default Home;