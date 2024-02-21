let aaa = "hello";
// aaa = 3;

let bbb: string = " hello";
// hello = 3;

let ccc: number | string = 1000;
ccc = "1000";

let ddd: number = 10;
// ddd = "hello";

let eee: boolean = true;
// eee = "false";

let fff: number[] = [1, 2, 3, 4, 5];
let ggg: (string | number)[] = [1, 2, 3, "철수", "영희"];

interface IProfile {
  name: string;
  age: number | String;
  school: string;
  hobby?: string;
}
const profile: IProfile = {
  name: "철수",
  age: 12,
  school: "다람쥐 초등학교",
};
profile.name = "훈이";
profile.age = 10;
profile.hobby = "수영";

function add1(num1: number, num2: number, unit: string): string {
  let result: number = num1 + num2;
  return result + unit;
}
add1(100, 200, "원");

const add2 = (num1: number, num2: number, unit: string): string => {
  let result: number = num1 + num2;
  return result + unit;
};
add2(100, 200, "원");

let qqq: any = 100;
qqq = "hello";
