var nextPayment = 500;
var nextPaymentLimit = 60*3;
var nextPaymentScale = 1.5;

class Player{
  constructor(name){
    this.name = name;
    this.gold = 1000;
    this.lumber = 0;
    this.food = 0;
    this.stone = 0;
    this.taxes = 0;
    this.goldIncrement = 0;
    this.stoneIncrement = 0;
    this.lumberIncrement = 0;
    this.foodIncrement = 0;
    this.delay = 500;
    this.counter = 0;
    this.farms = [];
    this.sawhills = [];
    this.minerys = [];
    this.ports = [];
    this.shops = [];
    this.fabrics = [];
    this.logBox = ['','','','','',''];
    this.nextPayment = nextPayment;
    this.nextPaymentLimit = nextPaymentLimit;
    this.nextPaymentScale = nextPaymentScale;
    this.initialTime = new Date();
    this.timeLeft = new Date();
    this.actualTime = new Date();
    this.stonePrice = 10;
    this.lumberPrice = 8;
    this.foodPrice = 5;
    this.sellingQuantity = 10;
  }
  paymentCounter(){
    this.actualTime = new Date();
    var timeLeftMs = this.initialTime.getTime() + (this.nextPaymentLimit*1000);
    this.timeLeft.setTime(timeLeftMs);
      if(this.actualTime.getTime() >= this.timeLeft.getTime()){
        this.gold -= this.nextPayment;
        this.pushLog('PAYMENT TIME! -' + this.nextPayment + ' gold.');
        this.initialTime = this.actualTime;
        this.nextPayment = parseInt(this.nextPayment*this.nextPaymentScale);
    }
  }
  modSellQuantity(){
    if(this.sellingQuantity == 10){
      this.sellingQuantity = 100;
    } else {
      this.sellingQuantity = 10;
    }
  }
  economics(){
    if(this.counter>=this.delay){
      this.goldIncrement = 0;
      this.stoneIncrement = 0;
      this.foodIncrement = 0;
      this.lumberIncrement = 0;
      this.taxes = 0;
      this.counter = 0;
      for(var i=0; i<this.farms.length; i++){
        this.goldIncrement -= this.farms[i].incomes;
        this.gold -= this.farms[i].incomes;
        this.taxes += this.farms[i].incomes;
        this.foodIncrement += this.farms[i].explotation();
        this.food += this.farms[i].explotation();
      }
      for(var i=0; i<this.sawhills.length; i++){
        this.goldIncrement -= this.sawhills[i].incomes;
        this.gold -= this.sawhills[i].incomes;
        this.taxes += this.sawhills[i].incomes;
        this.lumberIncrement += this.sawhills[i].explotation();
        this.lumber += this.sawhills[i].explotation();
      }
      for(var i=0; i<this.minerys.length; i++){
        this.goldIncrement -= this.minerys[i].incomes;
        this.gold -= this.minerys[i].incomes;
        this.taxes += this.minerys[i].incomes;
        this.stoneIncrement += this.minerys[i].explotation();
        this.stone += this.minerys[i].explotation();
      }
      for(var i=0; i<this.ports.length; i++){
        this.goldIncrement -= this.ports[i].incomes;
        this.gold -= this.ports[i].incomes;
        this.taxes += this.ports[i].incomes;
        this.foodIncrement += this.ports[i].explotation();
        this.food += this.ports[i].explotation();
      }
      for(var i=0; i<this.shops.length; i++){
        this.goldIncrement -= this.shops[i].incomes;
        this.gold -= this.shops[i].incomes;
        this.taxes += this.shops[i].incomes;
        this.goldIncrement += this.shops[i].benefaction();
        this.gold += this.shops[i].benefaction();
        if(this.food>=this.shops[i].foodCost && this.lumber>=this.shops[i].lumberCost && this.stone>=this.shops[i].stoneCost){
          this.food -= this.shops[i].foodCost;
          this.foodIncrement -= this.shops[i].foodCost;
          this.lumber -= this.shops[i].lumberCost;
          this.lumberIncrement -= this.shops[i].lumberCost;
          this.stone -= this.shops[i].stoneCost;
          this.stoneIncrement -= this.shops[i].stoneCost;
        }
      }
      for(var i=0; i<this.fabrics.length; i++){
        this.goldIncrement -= this.fabrics[i].incomes;
        this.gold -= this.fabrics[i].incomes;
        this.taxes += this.fabrics[i].incomes;
        this.goldIncrement += this.fabrics[i].benefaction();
        this.gold += this.fabrics[i].benefaction();
        if(this.food>=this.fabrics[i].foodCost && this.lumber>=this.fabrics[i].lumberCost && this.stone>=this.fabrics[i].stoneCost){
          this.food -= this.fabrics[i].foodCost;
          this.foodIncrement -= this.fabrics[i].foodCost;
          this.lumber -= this.fabrics[i].lumberCost;
          this.lumberIncrement -= this.fabrics[i].lumberCost;
          this.stone -= this.fabrics[i].stoneCost;
          this.stoneIncrement -= this.fabrics[i].stoneCost;
        }
      }
    }
    this.counter++;
  }
  pushLog(jobLog){
    var date1 = new Date();
    if(this.logBox[this.logBox.length-1] == (date1.getHours()+':'+date1.getMinutes()+':'+date1.getSeconds() + ' ' + jobLog)){
    }else {
      this.logBox.push(('0' + date1.getHours()).slice(-2)+':'+('0' + date1.getMinutes()).slice(-2)+':'+('0' + date1.getSeconds()).slice(-2) + ' ' + jobLog);
    }
  }
  sell(y,x,material){
    var quantity = this.sellingQuantity;
    var price = 0;
    switch (material) {
      case 'food':
        if(this.food>=quantity){
          price = this.foodPrice;
          this.food-=quantity;
          this.gold+=(quantity*price);
          this.pushLog('sold ' + quantity + ' units of food for ' + (quantity*price) + ' gold.' );
        } else {
          this.pushLog('not food');
        }
          break;
      case 'lumber':
        if(this.lumber>=quantity){
          price = this.lumberPrice;
          this.lumber-=quantity;
          this.gold+=(quantity*price);
          this.pushLog('sold ' + quantity + ' units of lumber for ' + (quantity*price) + ' gold.' );
        } else {
          this.pushLog('not lumber');
        }
        break;
      case 'stone':
        if(this.stone>=quantity){
          price = this.stonePrice;
          this.stone-=quantity;
          this.gold+=(quantity*price);
          this.pushLog('sold ' + quantity + ' units of stone for ' + (quantity*price) + ' gold.' );
        } else {
          this.pushLog('not stone');
        }
        break;
      default:
    }
  }
  addFarm(y,x){
    var farm1 = new Farm(y,x);
    if (this.gold >= farm1.cost){
      this.gold -= farm1.cost;
      this.farms.push(farm1);
      this.pushLog('add farm');
    } else {
      this.pushLog('not gold');
    }
  }
  addSawhill(y,x){
    var sawhill1 = new Sawhill(y,x);
    if (this.gold >= sawhill1.cost){
      this.gold -= sawhill1.cost;
      this.sawhills.push(sawhill1);
      this.pushLog('add sawhill');
    } else {
      this.pushLog('not gold');
    }
  }
  addMinery(y,x){
    var minery1 = new Minery(y,x);
    if (this.gold >= minery1.cost){
      this.gold -= minery1.cost;
      this.minerys.push(minery1);
      this.pushLog('add minery');
    } else {
      this.pushLog('not gold');
    }
  }
  addPort(y,x){
    var port1 = new Port(y,x);
    if (this.gold >= port1.cost){
      this.gold -= port1.cost;
      this.ports.push(port1);
      this.pushLog('add port');
    } else {
      this.pushLog('not gold');
    }
  }
  addShop(y,x){
    var shop1 = new Shop(y,x);
    if (this.gold >= shop1.cost){
      this.gold -= shop1.cost;
      this.shops.push(shop1);
      this.pushLog('add shop');
    } else {
      this.pushLog('not gold');
    }
  }
  addFabric(y,x){
    var fabric1 = new Fabric(y,x);
    if (this.gold >= fabric1.cost){
      this.gold -= fabric1.cost;
      this.fabrics.push(fabric1);
      this.pushLog('add fabric');
    } else {
      this.pushLog('not gold');
    }
  }
  create(y,x){
    y = Math.round((cursorY+correctorY)/boxHeight)-1 + cameraY;
    x = Math.round((cursorX+correctorX-uiWidth)/boxWidth)-1 + cameraX;
    switch (map[y][x]) {
      case glass:
        if(createMode == harvGlass){
          this.addFarm(y,x);
          this.farms[this.farms.length - 1].draw();
        } else if(createMode == harvShop){
            if(this.thereIsVillage(y,x)){
              this.addShop(y,x);
              this.shops[this.shops.length - 1].draw();
            } else {
              this.pushLog('not village near');
            }
          } else {
            this.pushLog('is not possible');
          }
        break;
      case tree:
        if(createMode == harvTree){
          this.addSawhill(y,x);
          this.sawhills[this.sawhills.length - 1].draw();
        } else {
          this.pushLog('is not possible');
        }
        break;
      case rock:
        if(createMode == harvRock){
          this.addMinery(y,x);
          this.minerys[this.minerys.length - 1].draw();
        } else {
          this.pushLog('is not possible');
        }
        break;
      case water:
        if(createMode == harvWater){
          this.addPort(y,x);
          this.ports[this.ports.length - 1].draw();
        } else {
          this.pushLog('is not possible');
        }
        break;
      case harvTree:
        if(createMode == fabric){
            this.addFabric(y,x);
            this.fabrics[this.fabrics.length - 1].draw();
        } else {
            this.pushLog('is not possible');
        }
        break;
    }
  }

  thereIsVillage(y,x){
    var thereIsVillageHere = false;
    var range = 1;
    for(var i=(y-range); i<(y+range+1); i++){
      for(var k=(x-range); k<(x+range+1); k++){
        if(i>=0 && k>=0){
          if(map[i][k] == village){
            thereIsVillageHere = true;
          }
        }
      }
    }
    return thereIsVillageHere;
  }
}
