import { useEffect, useState } from 'react';
import JoyStick from './joy';
import './App.css';

const App = () => {

  var canvas;
  var ctx;
  var dx = 5;
  var dy = 5;
  var x = 150;
  var y = 100;
  var WIDTH = 300;
  var HEIGHT = 200;

  var moveDirection = 'C'

  function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.fill();
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

  function draw() {
    if (moveDirection == 'N') {
      if (y - dy > 0) {
        y -= dy;
      }
    }
    if (moveDirection == 'NE') {
      if (y - dy > 0) {
        y -= dy;
      }
      if (x + dx < WIDTH) {
        x += dx;
      }
    }
    if (moveDirection == 'NW') {
      if (y - dy > 0) {
        y -= dy;
      }
      if (x - dx > 0) {
        x -= dx;
      }
    }
    if (moveDirection == 'S') {
      if (y + dy < HEIGHT) {
        y += dy;
      }
    }
    if (moveDirection == 'SW') {
      if (y + dy < HEIGHT) {
        y += dy;
      }
      if (x - dx > 0) {
        x -= dx;
      }
    }
    if (moveDirection == 'SE') {
      if (y + dy < HEIGHT) {
        y += dy;
      }
      if (x + dx < WIDTH) {
        x += dx;
      }
    }
    if (moveDirection == 'W') {
      if (x - dx > 0) {
        x -= dx;
      }
    }
    if (moveDirection == 'E') {
      if (x + dx < WIDTH) {
        x += dx;
      }
    }

    clear();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    rect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "purple";
    circle(x, y, 10);
  }

  useEffect(() => {
    init();

    let joy1 = new JoyStick('joyContain', {}, function (stickData) {
      moveDirection = stickData.cardinalDirection;
    });
  }, []);

  return (
    <div className='main'>
      <canvas id="canvas" width="300" height="200" className='canvas'>
        This text is displayed if your browser does not support HTML5 Canvas.
      </canvas>
      <div id="joyContain"></div>
    </div>
  )
}

export default App;