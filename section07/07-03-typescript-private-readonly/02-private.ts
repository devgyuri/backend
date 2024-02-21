class Monster2 {
  constructor(private power: any) {}

  attack1 = () => {
    console.log("attack1");
    console.log(`공격력은 ${this.power}입니다.`);
    this.power = 30;
  };
}

class airMonster2 extends Monster2 {
  attack2 = () => {
    console.log("attack2");
    // console.log(`공격력은 ${this.power}입니다.`);
    // this.power = 30;
  };

  run = () => {
    console.log("날아서 도망가자!");
  };
}

const myMonster2 = new airMonster2(70);
myMonster2.run();
myMonster2.attack1();
myMonster2.attack2();
// console.log(myMonster2.power);
// myMonster2.power = 30;
