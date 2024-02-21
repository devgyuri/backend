const date = new Date();
console.log(date.getFullYear());
console.log(date.getMonth() + 1);

class Monster {
  power = 10;

  constructor(qqq) {
    this.power = qqq;
  }

  attack = () => {
    console.log("공격하자!");
    console.log(`공격력은 ${this.power}입니다.`);
  };

  run = () => {
    console.log("도망가자!");
  };
}

const myMonster1 = new Monster(30);
const myMonster2 = new Monster(50);
myMonster1.attack();
