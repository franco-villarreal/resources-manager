var canvas;
var ctx;
var FPS = 60;
var boxWidth = 64;
var boxHeight = 64;
var columns = 15;
var rows = 10;
var canvasWidth = boxWidth * columns;
var canvasHeight = boxHeight * rows;
var tileMap;
var timer = 0;
var playerName = '';
var isPaused = false;
var actualTime = new Date();
var pauseMs = 0;

function startGame(){
  var ok = confirm('Do you wanna start to play?');
  playerName = prompt('Write your name','');
  if(ok){
    initialize();
  }
}
function pauseGame(){
  ctx.drawImage(pausedBox,0,0,256,128,((canvasWidth+uiWidth)/2)-(boxWidth*2),(canvasHeight/2)-(boxHeight*1),boxWidth*4,boxHeight*2);
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.textAlign = "center";
  ctx.font = '40px ' + font;
  ctx.fillText('PAUSE',((canvasWidth+uiWidth)/2)-(boxWidth*2)+(boxWidth*2),(canvasHeight/2)-(boxHeight*1)+boxHeight);
  timePause = new Date();
}
function initialize(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  tileMap = new Image();
  tileMap.src = 'img/map3.png';
  tileUi = new Image();
  tileUi.src = 'img/ui.png';
  tileUi2 = new Image();
  tileUi2.src = 'img/ui2.png';
  tileLog = new Image();
  tileLog.src = 'img/logText.png';
  auxText = new Image();
  auxText.src = 'img/auxText.png';
  mouseRect = new Image();
  mouseRect.src = 'img/block.png';
  pausedBox = new Image();
  pausedBox.src = 'img/pauseBox.png';
  paymentBox = new Image();
  paymentBox.src = 'img/paymentBox.png';
  player = new Player(playerName);
  initializeMap();

  canvas.addEventListener('mousedown',mouseClickDown,false);
  canvas.addEventListener('mouseup',mouseClickUp,false);
  canvas.addEventListener('mousemove',mousePosition,false);

  document.addEventListener('keydown',function(key){
    if(key.keyCode == 38){
      cameraUp();
    }
    if(key.keyCode == 40){
      cameraDown();
    }
    if(key.keyCode == 37){
      cameraLeft();
    }
    if(key.keyCode == 39){
      cameraRight();
    }
    if(key.keyCode == 16){
      player.modSellQuantity();
    }
    if(key.keyCode == 80){
      if(isPaused){
        isPaused = false;
        actualTime = new Date();
        pauseMs = actualTime.getTime() - timePause.getTime();
        var newTimeLeft = player.initialTime.getTime() + pauseMs;
        player.initialTime.setTime(newTimeLeft);
      } else {
        isPaused = true;
        pauseGame();
      }
    }
  });
  document.addEventListener('keyup',function(key){
    if(key.keyCode == 16){
      player.modSellQuantity();
    }
  });

  setInterval(function(){
    if(!isPaused){
      main();
    }
  }, 1000/FPS);
}

function main(){
  columns = 15;
  rows = 10;
  canvasWidth = boxWidth * columns;
  canvasHeight = boxHeight * rows;
  clearScreen();
  drawMap2();
  drawUi()
  player.economics();
  player.paymentCounter();
  mouseHover();
  timer++;
}

function clearScreen(){
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}
