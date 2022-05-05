import { useEffect, useState } from 'react';
import JoyStick from './joy';
import './App.css';

const App = () => {

  let canvas;
  let ctx;
  let dx = 5;
  let dy = 5;
  let move_x = 150;
  let move_y = 100;
  let target_x = 30;
  let target_y = 40;
  let WIDTH = 300;
  let HEIGHT = 200;

  let moveDirection = 'C';
  let targetDirection = 'C';

  function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.fill();
  }

  function target(x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x, y + r);
    ctx.moveTo(x - r, y);
    ctx.lineTo(x + r, y);
    ctx.stroke();
  }

  function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }

  function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    return setInterval(draw, 100);
  }

  function handleMovePosition() {
    if (moveDirection == 'N') {
      if (move_y - dy > 0) {
        move_y -= dy;
      }
    }
    if (moveDirection == 'NE') {
      if (move_y - dy > 0) {
        move_y -= dy;
      }
      if (move_x + dx < WIDTH) {
        move_x += dx;
      }
    }
    if (moveDirection == 'NW') {
      if (move_y - dy > 0) {
        move_y -= dy;
      }
      if (move_x - dx > 0) {
        move_x -= dx;
      }
    }
    if (moveDirection == 'S') {
      if (move_y + dy < HEIGHT) {
        move_y += dy;
      }
    }
    if (moveDirection == 'SW') {
      if (move_y + dy < HEIGHT) {
        move_y += dy;
      }
      if (move_x - dx > 0) {
        move_x -= dx;
      }
    }
    if (moveDirection == 'SE') {
      if (move_y + dy < HEIGHT) {
        move_y += dy;
      }
      if (move_x + dx < WIDTH) {
        move_x += dx;
      }
    }
    if (moveDirection == 'W') {
      if (move_x - dx > 0) {
        move_x -= dx;
      }
    }
    if (moveDirection == 'E') {
      if (move_x + dx < WIDTH) {
        move_x += dx;
      }
    }
  }

  function handleTargetPosition() {
    if (targetDirection == 'N') {
      if (target_y - dy > 0) {
        target_y -= dy;
      }
    }
    if (targetDirection == 'NE') {
      if (target_y - dy > 0) {
        target_y -= dy;
      }
      if (target_x + dx < WIDTH) {
        target_x += dx;
      }
    }
    if (targetDirection == 'NW') {
      if (target_y - dy > 0) {
        target_y -= dy;
      }
      if (target_x - dx > 0) {
        target_x -= dx;
      }
    }
    if (targetDirection == 'S') {
      if (target_y + dy < HEIGHT) {
        target_y += dy;
      }
    }
    if (targetDirection == 'SW') {
      if (target_y + dy < HEIGHT) {
        target_y += dy;
      }
      if (target_x - dx > 0) {
        target_x -= dx;
      }
    }
    if (targetDirection == 'SE') {
      if (target_y + dy < HEIGHT) {
        target_y += dy;
      }
      if (target_x + dx < WIDTH) {
        target_x += dx;
      }
    }
    if (targetDirection == 'W') {
      if (target_x - dx > 0) {
        target_x -= dx;
      }
    }
    if (targetDirection == 'E') {
      if (target_x + dx < WIDTH) {
        target_x += dx;
      }
    }
  }

  function draw() {
    handleMovePosition();
    handleTargetPosition();
    clear();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    rect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "purple";
    circle(move_x, move_y, 10);
    target(target_x, target_y, 10);
  }

  useEffect(() => {
    init();

    let joy1 = new JoyStick('joyContain1', {}, function (stickData) {
      moveDirection = stickData.cardinalDirection;
    });
    let joy2 = new JoyStick('joyContain2', {}, function (stickData) {
      targetDirection = stickData.cardinalDirection;
    });
  }, []);

  return (
    <div className="main">
      <canvas id="canvas" width="300" height="200" className='canvas'>
        This text is displayed if your browser does not support HTML5 Canvas.
      </canvas>
      <div className="controller-contain">
        <div id="joyContain1"></div>
        <div id="joyContain2"></div>
      </div>
    </div>
  )
}

export default App;