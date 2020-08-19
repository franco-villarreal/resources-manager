var cursorX = 0;
var cursorY = 0;
var correctorX = 20;
var correctorY = 15;
var createMode = 99;
var uiResources = 0;
var uiGold = 1;
var sellFood = 2;
var sellLumber = 3;
var sellStone = 4;
var uiTaxes = 5;
var uiBuilding = 6;
var createFarm = 7;
var createSawhill = 8;
var createMinery = 9;
var createPort = 10;
var createShop = 11;
var createFabric = 12;
var moveCameraButtons = 19;
var moveBox = false;

function mouseClickDown(e){
  if(cursorX>=uiWidth && (cursorX<logBoxX || cursorX>(logBoxX+logBoxWidth) || cursorY<logBoxY-32 || cursorY>(logBoxY+logBoxHeight))){
    player.create(cursorY, cursorX);
  } else if(cursorX>=uiWidth && (cursorX>=logBoxX && cursorY>=logBoxY-32 && cursorX<logBoxWidth+logBoxX && cursorY<logBoxHeight+logBoxY)){
      moveBox = true;
  } else if(cursorX < uiWidth) {
    switch ((Math.round((cursorY-correctorY)/(boxHeight/2)))) {
      case sellFood:
        player.sell(cursorY, cursorX,'food');
        break;
      case sellLumber:
        player.sell(cursorY, cursorX,'lumber');
        break;
      case sellStone:
        player.sell(cursorY, cursorX,'stone');
        break;
      case createFarm:
        createMode = harvGlass;
        break;
      case createMinery:
        createMode = harvRock;
        break;
      case createSawhill:
        createMode = harvTree;
        break;
      case createPort:
        createMode = harvWater;
        break;
      case createShop:
        createMode = harvShop;
        break;
      case createFabric:
        createMode = fabric;
        break;
      case moveCameraButtons:
        if(cursorX<32){
          console.log('move left')
          cameraLeft();
        } else if(cursorX<64){
          console.log('move up')
          cameraUp();
        } else if(cursorX<96){
          console.log('move down')
          cameraDown();
        } else if(cursorX<128){
          console.log('move right')
          cameraRight()
        }
        break;
      default:

    }
  }
}

function mouseClickUp(e){
  if(moveBox){
    moveBox = false;
    if(logBoxX>(canvasWidth-logBoxWidth)){
      logBoxX = canvasWidth-logBoxWidth;
    }
    if(logBoxX<=uiWidth){
      logBoxX = uiWidth;
    }
    if(logBoxY>canvasHeight-logBoxHeight){
      logBoxY = canvasHeight-logBoxHeight;
    }
    if(logBoxY-32<=0){
      logBoxY = 0+32;
    }
  }
}

function mousePosition(e){
  cursorX = e.pageX;
  cursorY = e.pageY;
  if(moveBox){
    logBoxY = cursorY-(logBoxHeight/2);
    logBoxX = cursorX-(logBoxWidth/2);
  }
}

function mouseHover(){
  var mouseHoverY = Math.round((cursorY+correctorY)/boxHeight)-1;
  var mouseHoverX = Math.round((cursorX+correctorX)/boxWidth)-1;
  ctx.fillStyle = 'rgba(198, 196, 203, 0.3)';
  var tileRow = (Math.round((cursorY-correctorY)/(boxHeight/2)));
  var tileColumn = 0;
  if(cursorX>=uiWidth+correctorX && (cursorX<logBoxX || cursorX>(logBoxX+logBoxWidth) || cursorY<logBoxY-32 || cursorY>(logBoxY+logBoxHeight))){
    ctx.drawImage(tileMap,createMode*imgDimension,0*imgDimension,imgDimension,imgDimension,mouseHoverX*boxWidth,mouseHoverY*boxHeight,boxWidth,boxHeight);
    //ctx.drawImage(mouseRect,0*imgDimension,0*imgDimension,imgDimension,imgDimension,mouseHoverX*boxWidth,mouseHoverY*boxHeight,boxWidth,boxHeight);
    ctx.drawImage(mouseRect,0*imgDimension,0*imgDimension,imgDimension,imgDimension,mouseHoverX*boxWidth,mouseHoverY*boxHeight,boxWidth,boxHeight);
  } else if(cursorX <= uiWidth) {
    tileRow = (Math.round((cursorY-correctorY)/(boxHeight/2)));
    tileColumn = 0;
    if(tileRow<19){
      ctx.drawImage(tileUi2,tileColumn*uiImgWidth,tileRow*uiImgHeight,uiImgWidth,uiImgHeight,tileColumn,(boxHeight/2)*tileRow,uiWidth,(boxHeight/2));
      drawAuxText(tileRow);
    } else {
      if(cursorX<32){
        tileColumn = 0;
      } else if(cursorX<64){
        tileColumn = 32;
      } else if(cursorX<96){
        tileColumn = 64;
      } else if(cursorX<128){
        tileColumn = 96;
      }
      ctx.drawImage(tileUi2,tileColumn*0,tileRow*uiImgHeight,32,uiImgHeight,tileColumn,(boxHeight/2)*tileRow,32,(boxHeight/2));
      drawAuxText(tileRow);
    }
  } 
}

var delayHover = 20;
var counterHover = 0;
function animateBlock(arrayImg, imgWidth, imgHeight, mouseHoverX, mouseHoverY){
  if(counterHover>=0 && counterHover<=delayHover/2){
    ctx.drawImage(arrayImg[0],0*imgDimension,0*imgDimension,imgDimension,imgDimension,mouseHoverX*boxWidth,mouseHoverY*boxHeight,boxWidth,boxHeight);
    counterHover++;
  } else if (counterHover>delayHover/2 && counterHover<delayHover){
    counterHover++;
    ctx.drawImage(arrayImg[1],0,0,imgWidth,imgHeight,mouseHoverX*boxWidth,mouseHoverY*boxHeight,boxWidth,boxHeight);
  } else {
    counterHover = 0;
  }
}
