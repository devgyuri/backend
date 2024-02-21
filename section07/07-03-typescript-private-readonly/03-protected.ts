class Monster3 {
  constructor(protected power: any) {}

  attack1 = () => {
    console.log("attack1");
    console.log(`공격력은 ${this.power}입니다.`);
    this.power = 30;
  };
}

class airMonster3 extends Monster3 {
  attack2 = () => {
    console.log("attack2");
    console.log(`공격력은 ${this.power}입니다.`);
    this.power = 30;
  };

  run = () => {
    console.log("날아서 도망가자!");
  };
}

const myMonster3 = new airMonster3(70);
myMonster3.run();
myMonster3.attack1();
myMonster3.attack2();
// console.log(myMonster3.power);
// myMonster3.power = 30;
