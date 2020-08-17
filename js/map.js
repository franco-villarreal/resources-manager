var glass = 0;
var water = 1;
var tree = 2;
var rock = 3;
var village = 4;
var harvGlass = 5;
var harvTree = 6;
var harvRock = 7;
var harvWater = 8;
var harvShop = 9;
var fabric = 10;

var mapWidth = 30;
var mapHeight = 30;
var imgDimension = 64;

var map = [];

function initializeMap(){
  for (var y=0; y<mapHeight; y++){
    for (var x=0; x<mapWidth; x++){
      map.push([]);
      var random = Math.floor(Math.random() * 4);
      switch (random) {
        case glass:
          break;
        case water:
          random = Math.floor(Math.random() * 4);
          break;
        case rock:
          random = Math.floor(Math.random() * 4);
          break;
        case tree:
            random = Math.floor(Math.random() * 4);
            break;
        default:
      }
      switch (random) {
        case glass:
          break;
        case water:
          random = Math.floor(Math.random() * 5);
          break;
        case rock:
          random = Math.floor(Math.random() * 5);
          break;
        case tree:
            break;
        case village:
            random = Math.floor(Math.random() * 5);
            break;
        default:
      }
      switch (random) {
        case glass:
          break;
        case water:
          random = Math.floor(Math.random() * 5);
          break;
        case rock:
          random = Math.floor(Math.random() * 5);
          break;
        case tree:
            break;
        case village:
            random = Math.floor(Math.random() * 5);
            break;
        default:
      }
      map[y][x] = random;
    }
  }
}

function drawMap(){
  for (var y=0; y<map.length; y++){
    for (var x=0; x<map[0].length; x++){
      var tileRow = 0;
      var tileColumn = map[y][x];
      ctx.drawImage(tileMap,tileColumn*imgDimension,tileRow*imgDimension,imgDimension,imgDimension,boxWidth*x+uiWidth,boxHeight*y,boxWidth,boxHeight);
    }
  }
}

function drawMap2(){
  for (var y=cameraY; y<map.length; y++){
    for (var x=cameraX; x<map[0].length; x++){
      var tileRow = 0;
      var tileColumn = map[y][x];
      ctx.drawImage(tileMap,tileColumn*imgDimension,tileRow*imgDimension,imgDimension,imgDimension,boxWidth*(x-cameraX)+uiWidth,boxHeight*(y-cameraY),boxWidth,boxHeight);
    }
  }
}

var cameraX = 0;
var cameraY = 0;

function cameraUp(){
  if (cameraY>0){
    cameraY--;
  }
}
function cameraDown(){
  if (cameraY<(mapHeight-rows)){
    cameraY++;
  }
}
function cameraRight(){
  if(cameraX<(mapWidth-columns)){
    cameraX++;
  }
}
function cameraLeft(){
  if (cameraX>0){
    cameraX--;
  }
}
