var uiWidth = boxWidth*2;
var uiHeight = canvasHeight;
var fontSize = 14;
var fontSize2 = 14;
var fontSize3 = 12;
var font = 'Fangsong';
var marginLeft = boxWidth*2-10;
var marginLeft2 = 48+32;//boxWidth*1.5-10;
var uiImgWidth = 128;
var uiImgHeight = 32;
var logBoxWidth = boxWidth*5;
var logBoxHeight = boxHeight*2;
var logBoxX = canvasWidth-boxWidth*5;
var logBoxY = boxHeight*(rows-2);
var payBoxWidth = 320;
var payBoxHeight = 32;
var payBoxX = 32;
var payBoxY = 32;

var uiMap = [
  [0],
  [1],
  [2],
  [3],
  [4],
  [5],
  [6],
  [7],
  [8],
  [9],
  [10],
  [11],
  [12],
  [13],
  [14],
  [15],
  [16],
  [17]
];
function drawUi(){
  var auxGold = '';
  var auxFood = '';
  var auxLumber = '';
  var auxStone = '';
  for (var y=0; y<uiMap.length; y++){
    for (var x=0; x<uiMap[0].length; x++){
      var tileRow = uiMap[y][x];
      var tileColumn = 0;
      ctx.drawImage(tileUi,tileColumn*uiImgWidth,tileRow*uiImgHeight,uiImgWidth,uiImgHeight,0,(boxHeight/2)*tileRow,uiWidth,(boxHeight/2));
    }
  }
  ctx.drawImage(tileUi,0,0,uiWidth,640,0,0,uiWidth,640);
  ctx.fillStyle = 'rgb(7, 1, 9)';
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.font = fontSize + 'px ' + font;
  ctx.fillText('RESOURCES',uiWidth/2,boxHeight/2+boxHeight*(-0.25));
  ctx.textAlign = "right";
  if(player.goldIncrement>=0){
    auxGold = '+';
  }
  if(player.foodIncrement>=0){
    auxFood = '+';
  }
  if(player.lumberIncrement>=0){
    auxLumber = '+';
  }
  if(player.stoneIncrement>=0){
    auxStone = '+';
  }
  ctx.fillText(player.gold + ' (' + auxGold + player.goldIncrement + ')',marginLeft,boxHeight/2+boxHeight*0.25);
  ctx.fillText(player.food + ' (' + auxFood + player.foodIncrement + ')',marginLeft,boxHeight/2+boxHeight*0.75);
  ctx.fillText(player.lumber + ' (' + auxLumber + player.lumberIncrement + ')',marginLeft,boxHeight/2+boxHeight*1.25);
  ctx.fillText(player.stone + ' (' + auxStone + player.stoneIncrement + ')',marginLeft,boxHeight/2+boxHeight*1.75);
  ctx.fillText(Math.abs(player.taxes),marginLeft,boxHeight/2+boxHeight*2.25);
  ctx.textAlign = "center";
  ctx.font = fontSize2 + 'px ' + font;
  ctx.fillText('BUILDING',uiWidth/2,boxHeight/2+boxHeight*2.75);
  ctx.fillText('FARM',marginLeft2,boxHeight/2+boxHeight*3.25);
  ctx.fillText('SAWHILL',marginLeft2,boxHeight/2+boxHeight*3.75);
  ctx.fillText('MINERY',marginLeft2,boxHeight/2+boxHeight*4.25);
  ctx.fillText('PORT',marginLeft2,boxHeight/2+boxHeight*4.75);
  ctx.fillText('SHOP',marginLeft2,boxHeight/2+boxHeight*5.25);
  ctx.fillText('FACTORY',marginLeft2,boxHeight/2+boxHeight*5.75);
  ctx.fillText('TIME: ' + ('0' + player.actualTime.getHours()).slice(-2) + ':' + ('0' + player.actualTime.getMinutes()).slice(-2)
  + ':' + ('0' + player.actualTime.getSeconds()).slice(-2) + ' ', 64,boxHeight/2+boxHeight*7.25);
  drawLogBox();
  drawPayBox();
}

/*
uiResources = 0;
uiGold = 1;
sellFood = 2;
sellLumber = 3;
sellStone = 4;
uiTaxes = 5;
uiBuilding = 6;
createFarm = 7;
createSawhill = 8;
createMinery = 9;
createPort = 10;
createShop = 11;
*/

function drawLogBox(){
  ctx.drawImage(tileLog,0,0,320,128,logBoxX,logBoxY,logBoxWidth,logBoxHeight);
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.textAlign = "left";
  ctx.font = fontSize3 + 'px ' + font;
  ctx.fillText(player.logBox[player.logBox.length - 6],logBoxX+fontSize3,logBoxY+fontSize3*1.5);
  ctx.fillText(player.logBox[player.logBox.length - 5],logBoxX+fontSize3,logBoxY+fontSize3*3);
  ctx.fillText(player.logBox[player.logBox.length - 4],logBoxX+fontSize3,logBoxY+fontSize3*4.5);
  ctx.fillText(player.logBox[player.logBox.length - 3],logBoxX+fontSize3,logBoxY+fontSize3*6);
  ctx.fillText(player.logBox[player.logBox.length - 2],logBoxX+fontSize3,logBoxY+fontSize3*7.5);
  ctx.fillStyle = 'rgb(42, 157, 29)';
  ctx.fillText(player.logBox[player.logBox.length - 1],logBoxX+fontSize3,logBoxY+fontSize3*9);
}
function drawPayBox(){
  payBoxX = logBoxX;
  payBoxY = logBoxY-(boxHeight/2);
  var timeCounter = player.timeLeft.getTime()-player.actualTime.getTime();
  var timeCounterDate = new Date();
  timeCounterDate.setTime(timeCounter);
  ctx.drawImage(paymentBox,0,0,payBoxWidth,payBoxHeight,payBoxX,payBoxY,payBoxWidth,payBoxHeight);
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.textAlign = "left";
  ctx.font = fontSize3 + 'px ' + font;
  ctx.fillText('NEXT PAYMENT! ' + ('0' + timeCounterDate.getMinutes()).slice(-2) + ':' + ('0' + timeCounterDate.getSeconds()).slice(-2), payBoxX+fontSize3,payBoxY+fontSize3*1.5);
  ctx.textAlign = "right";
  ctx.font = (fontSize3+2) + 'px ' + font;
  ctx.fillStyle = 'rgb(224, 224, 25)';
  ctx.fillText('-' + player.nextPayment + ' GOLD',payBoxX+payBoxWidth-fontSize3,payBoxY+fontSize3*1.5);
}
function drawAuxText(y){
  var line1 = '';
  var line2 = '';
  var line3 = '';
  var line4 = '';
  var line5 = '';
  var line6 = '';
  switch(y){
    case uiResources:
      line1 = 'Aqui veras los recursos almacenados. Al dar';
      line2 = 'sobre un recurso, podras vender 10 unidades';
      line3 = 'de este, a cambio de oro.';
      line4 = 'Tip: si mantienes pulsada la tecla "shift"';
      line5 = 'podras vender en paquetes de 100 unidades.';
      line6 = '';
      break;
    case uiGold:
      line1 = 'Esta es la cantidad de oro conseguido. Podras';
      line2 = 'vendiendo recursos o construyendo mercados.';
      line3 = '';
      line4 = '';
      line5 = '';
      line6 = '';
      break;
    case sellFood:
      line1 = 'Esta es la cantidad de alimento obtenido.';
      line2 = 'Podras conseguirlo con granjas o muelles.';
      line3 = 'Actualmente, se vende por ' + player.foodPrice + ' de oro.';
      line4 = '';
      line5 = '';
      line6 = '';
      break;
    case sellLumber:
      line1 = 'Esta es la cantidad de madera obtenida. Podras';
      line2 = 'conseguirla creando aserraderos.';
      line3 = 'Actualmente, se vende por ' + player.lumberPrice + ' de oro.';
      line4 = '';
      line5 = '';
      line6 = '';
      break;
    case sellStone:
      line1 = 'Esta es la cantidad de piedra obtenida. Podras';
      line2 = 'conseguirla con las minas.';
      line3 = 'Actualmente, se vende por ' + player.stonePrice + ' de oro.';
      line4 = '';
      line5 = '';
      line6 = '';
      break;
    case uiTaxes:
      line1 = 'Este es el total de impuestos que deberas';
      line2 = 'abonar en cada ciclo. Toda construccion';
      line3 = 'posee un impuesto.';
      line4 = '';
      line5 = '';
      line6 = '';
      break;
    case uiBuilding:
      line1 = 'Aqui veras los tipos de edificios que';
      line2 = 'puedes construir. Cada uno tendra un';
      line3 = 'costo, un impuesto, y un beneficio.';
      line4 = '';
      line5 = '';
      line6 = '';
      break;
    case createFarm:
      line1 = 'Al crear una granja podras producir';
      line2 = 'alimento.';
      line3 = '';
      line4 = 'Costo: ' + farmCost;
      line5 = 'Impuesto: ' + farmTax;
      line6 = 'Beneficio: ' + farmBenefict + ' de alimento.';
      break;
    case createSawhill:
      line1 = 'Al crear un aserradero podras obtener';
      line2 = 'madera.';
      line3 = '';
      line4 = 'Costo: ' + sawhillCost;
      line5 = 'Impuesto: ' + sawhillTax;
      line6 = 'Beneficio: ' + sawhillBenefict + ' de madera.';
      break;
    case createMinery:
      line1 = 'Al crear una mina podras obtener piedra.';
      line2 = '';
      line3 = '';
      line4 = 'Costo: ' + mineryCost;
      line5 = 'Impuesto: ' + mineryTax;
      line6 = 'Beneficio: ' + mineryBenefict + ' de piedra.';
      break;
    case createPort:
      line1 = 'Al crear un muelle podras pescar y';
      line2 = 'obtener alimento.';
      line3 = '';
      line4 = 'Costo: ' + portCost;
      line5 = 'Impuesto: ' + portTax;
      line6 = 'Beneficio: ' + portBenefict + ' de alimento.';
      break;
    case createShop:
      line1 = 'El mercado vende recursos a los pueblerinos. De';
      line2 = 'no tener recursos suficientes, dejara de funcionar.';
      line3 = 'Alimento/Madera/Piedra: ' + shopFoodCost + '/' + shopLumberCost + '/' + shopStoneCost;
      line4 = 'Costo: ' + shopCost;
      line5 = 'Impuesto: ' + shopTax;
      line6 = 'Beneficio: ' + shopBenefict + ' de oro.';
      break;
  }
  ctx.drawImage(auxText,0,0,logBoxWidth,logBoxHeight,logBoxX,logBoxY,logBoxWidth,logBoxHeight);
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.textAlign = "left";
  ctx.font = fontSize3 + 'px ' + font;
  ctx.fillText(line1,logBoxX+fontSize3,logBoxY+fontSize3*1.5);
  ctx.fillText(line2,logBoxX+fontSize3,logBoxY+fontSize3*3);
  ctx.fillText(line3,logBoxX+fontSize3,logBoxY+fontSize3*4.5);
  ctx.fillText(line4,logBoxX+fontSize3,logBoxY+fontSize3*6);
  ctx.fillText(line5,logBoxX+fontSize3,logBoxY+fontSize3*7.5);
  ctx.fillText(line6,logBoxX+fontSize3,logBoxY+fontSize3*9);
}
