class Monster1 {
  constructor(public power: any) {}

  attack1 = () => {
    console.log("attack1");
    console.log(`공격력은 ${this.power}입니다.`);
    this.power = 30;
  };
}

class airMonster1 extends Monster1 {
  attack2 = () => {
    console.log("attack2");
    console.log(`공격력은 ${this.power}입니다.`);
    this.power = 30;
  };

  run = () => {
    console.log("날아서 도망가자!");
  };
}

const myMonster1 = new airMonster1(70);
myMonster1.run();
myMonster1.attack1();
myMonster1.attack2();
console.log(myMonster1.power);
myMonster1.power = 30;
