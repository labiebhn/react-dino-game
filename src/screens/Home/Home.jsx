import React, { useEffect, useState, useRef } from 'react';
import { IconLogbox } from '../../assets/icons';
import { OrnamentFireball } from '../../assets/oranaments';
import GreenGround from '../../components/Grounds/GreenGround/GreenGround';
import MainSprite from '../../components/Sprites/MainSprite/MainSprite';
import './Home.scss';

function Home(props) {

  const [key, setKey] = useState(null);
  const [keyMove, setKeyMove] = useState([37, 39, 68, 65]);
  const [move, setMove] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [jump, setJump] = useState(false);
  const homeRef = useRef(null);

  return (
    <div 
      id="Home" 
      ref={homeRef} 
      onKeyDown={(e) => {
        setMove(keyMove.includes(e.keyCode) ? true : move);
        setKey(keyMove.includes(e.keyCode) ? e.keyCode : key);
        console.log(e.keyCode)
      }}
      onKeyUp={(e) => {
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
        <MainSprite 
          keyCode={key}
          move={move}
          speed={speed}
          jump={jump}
        />
      </div>
    </div>
  );
}

export default Home;