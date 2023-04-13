import CanvasDrawing from '../CanvasDrawing/CanvasDrawing'
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";
import anonMonster from '../../assets/monsterQuestionMark.png'
import "./Homepage.scss";
import { useRef, useState, useEffect } from "react";
import { API_URL } from "../../utils/api";
import { v4 as uuid } from 'uuid'

export default function Homepage() {
  const canvasRef = useRef(null);
  
  const [tokens, setTokens] = useState(loadTokensFromLocalStorage());

  useEffect(() => {
    saveTokensToLocalStorage(tokens);
  }, [tokens]);

  function addMonsterToken(monster) {
    let nextNumber = tokens.length + 1;
    while (tokens.some(token => token.number === nextNumber)) {
      nextNumber++;
    }
    const newToken = {
      id: nextNumber,
      number: nextNumber,
      x: 100,
      y: 0,
      name: monster.name,
      image: monster.image
        ? `https://www.dnd5eapi.co${monster.image}`
        : anonMonster
    };
    setTokens([...tokens, newToken]);
  }
  
  function addPlayerToken(player) {
    // let nextNumber = tokens.length + 1;
    // while (tokens.some(token => token.number === nextNumber)) {
    //   nextNumber++;
    // }
    let nextNumber = uuid()
    const newToken = {
      id: nextNumber,
      // number: nextNumber,
      x: 100,
      y: 0,
      name: player.name,
      image: player.icon
    };
    setTokens([...tokens, newToken]);
  }

  function handleMouseDown(event, index) {
    event.preventDefault()
    const newTokens = [...tokens];
    const token = newTokens[index];
    token.isDragging = true;
    token.dragStartX = event.clientX;
    token.dragStartY = event.clientY;
    token.className = "token isDragging";
    setTokens(newTokens);
  }
  
  function handleMouseMove(event, index) {
    const newTokens = [...tokens];
    const token = newTokens[index];
    if (!token.isDragging) {
      return;
    }
    const deltaX = event.clientX - token.dragStartX;
    const deltaY = event.clientY - token.dragStartY;
    token.x += deltaX;
    token.y += deltaY;
    token.dragStartX = event.clientX;
    token.dragStartY = event.clientY;
    setTokens(newTokens);
  }
  
  function handleMouseUp(event, index) {
    const newTokens = [...tokens];
    const token = newTokens[index];
    token.isDragging = false;
    token.className = "token";
    setTokens(newTokens);
  }

  function clearTokens() {
    setTokens([]);
  }

  function handleContextMenu(event, index) {
    event.preventDefault();
    const newTokens = [...tokens];
    newTokens.splice(index, 1);
    setTokens(newTokens);
  }
  
  function saveTokensToLocalStorage(tokens) {
    localStorage.setItem('tokens', JSON.stringify(tokens));
  }
  
  function loadTokensFromLocalStorage() {
    const tokensJson = localStorage.getItem('tokens');
    return tokensJson ? JSON.parse(tokensJson) : [];
  }
  
  return (
    <>
      <div className="flex">
        <SideBar addMonsterToken={addMonsterToken} addPlayerToken={addPlayerToken} />
        <div className="container">
          <CanvasDrawing clearTokens={clearTokens} canvasRef={canvasRef} />
          <div className="dragAndDrop">
            {tokens.map((token, index) => (
              <div
                key={token.id}
                className={`token ${token.className}`}
                style={{ left: token.x, top: token.y }}
                onContextMenu={(event) => handleContextMenu(event, index)}
                onMouseDown={(event) => handleMouseDown(event, index)}
                onMouseMove={(event) => handleMouseMove(event, index)}
                onMouseUp={(event) => handleMouseUp(event, index)}
              >
                <img src={token.image} alt="" />
                <span key={index} className="token__number">{token.name}{token.number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}