var sawhillCost = 120;
var portCost = 280;
var farmCost = 80;
var mineryCost = 230;
var shopCost = 500;

var sawhillTax = 10;
var portTax = 10;
var farmTax = 7;
var mineryTax = 13;
var shopTax = 3;

var sawhillBenefict = 2;
var portBenefict = 3;
var farmBenefict = 2;
var mineryBenefict = 3;
var shopBenefict = 230;

var shopStoneCost = 6; //60
var shopLumberCost = 10; //80
var shopFoodCost = 14; //70

class ExplotationBuild{
  constructor(y,x){
    this.y = y;
    this.x = x;
    this.cost = 0;
    this.benefict = 0;
    this.material = '';
    this.incomes = 0;
  }
  explotation(){
    return this.benefict;
  }
  draw(){
    map[this.y][this.x] = this.material;
  }
}
class Sawhill extends ExplotationBuild{
  constructor(y,x){
    super(y,x);
    this.cost = sawhillCost;
    this.benefict = sawhillBenefict;
    this.material = harvTree;
    this.incomes = sawhillTax;
  }
}

class Minery extends ExplotationBuild{
  constructor(y,x){
    super(y,x);
    this.cost = mineryCost;
    this.benefict = mineryBenefict;
    this.material = harvRock;
    this.incomes = mineryTax;
  }
}

class Farm extends ExplotationBuild{
  constructor(y,x){
    super(y,x);
    this.cost = farmCost;
    this.benefict = farmBenefict;
    this.material = harvGlass;
    this.incomes = farmTax;
  }
}

class Port extends ExplotationBuild{
  constructor(y,x){
    super(y,x);
    this.cost = portCost;
    this.benefict = portBenefict;
    this.material = harvWater;
    this.incomes = portTax;
  }
}
class Shop extends ExplotationBuild{
  constructor(y,x){
    super(y,x);
    this.cost = shopCost;
    this.benefict = 0;
    this.material = harvShop;
    this.incomes = shopTax;
    this.stoneCost = shopStoneCost;
    this.foodCost = shopFoodCost;
    this.lumberCost = shopLumberCost;
  }
    benefaction(){
      if(player.stone >= this.stoneCost && player.food >= this.foodCost && player.lumber >= this.lumberCost){
          this.benefict = shopBenefict;
      } else {
        player.pushLog('this shop (' + this.x + ', ' + this.y + ') is not working');
      }
      return this.benefict;
    }
}

class Fabric extends ExplotationBuild{
  constructor(y,x){
    super(y,x);
    this.cost = shopCost;
    this.benefict = 0;
    this.material = fabric;
    this.incomes = shopTax;
    this.stoneCost = shopStoneCost;
    this.foodCost = shopFoodCost;
    this.lumberCost = shopLumberCost;
  }
    benefaction(){
      if(player.stone >= this.stoneCost && player.food >= this.foodCost && player.lumber >= this.lumberCost){
          this.benefict = shopBenefict;
      } else {
        player.pushLog('this shop (' + this.x + ', ' + this.y + ') is not working');
      }
      return this.benefict;
    }
}
