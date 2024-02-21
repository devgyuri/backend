class Monster4 {
  constructor(readonly power: any) {}

  attack1 = () => {
    console.log("attack1");
    console.log(`공격력은 ${this.power}입니다.`);
    // this.power = 30;
  };
}

class airMonster4 extends Monster4 {
  attack2 = () => {
    console.log("attack2");
    console.log(`공격력은 ${this.power}입니다.`);
    // this.power = 30;
  };

  run = () => {
    console.log("날아서 도망가자!");
  };
}

const myMonster4 = new airMonster4(70);
myMonster4.run();
myMonster4.attack1();
myMonster4.attack2();
console.log(myMonster4.power);
// myMonster4.power = 30;
