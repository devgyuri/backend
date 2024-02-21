class Monster5 {
  constructor(private readonly power: any) {}

  attack1 = () => {
    console.log("attack1");
    console.log(`공격력은 ${this.power}입니다.`);
    // this.power = 30;
  };
}

class airMonster5 extends Monster5 {
  attack2 = () => {
    console.log("attack2");
    // console.log(`공격력은 ${this.power}입니다.`);
    // this.power = 30;
  };

  run = () => {
    console.log("날아서 도망가자!");
  };
}

const myMonster5 = new airMonster5(70);
myMonster5.run();
myMonster5.attack1();
myMonster5.attack2();
// console.log(myMonster5.power);
// myMonster5.power = 30;
