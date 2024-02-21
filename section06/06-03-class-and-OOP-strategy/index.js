class airPart {
  run = () => {
    console.log("날아서 도망가자!");
  };
}

class earthPart {
  run = () => {
    console.log("뛰어서 도망가자!");
  };
}

class Monster {
  power = 10;
  part;

  constructor(qqq) {
    this.part = qqq;
  }

  attack = () => {
    console.log("공격하자!");
    console.log(`공격력은 ${this.power}입니다.`);
  };

  run = () => {
    this.part.run();
  };
}

const myMonster1 = new Monster(new airPart());
myMonster1.run();
myMonster1.attack();
const myMonster2 = new Monster(new earthPart());
myMonster2.run();
myMonster2.attack();
