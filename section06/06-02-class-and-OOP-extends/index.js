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

class airMonster extends Monster {
  constructor(aaa) {
    super(aaa + 5);
  }

  run = () => {
    console.log("날아서 도망가자!");
  };
}

class earthMonster extends Monster {
  run = () => {
    console.log("뛰어서 도망가자!");
  };
}

const myMonster1 = new airMonster(70);
myMonster1.run();
myMonster1.attack();
const myMonster2 = new earthMonster(20);
myMonster2.attack();
