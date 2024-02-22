interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

type aaa = Partial<IProfile>;

type bbb = Required<IProfile>;

type ccc = Pick<IProfile, "name" | "age">;

type ddd = Omit<IProfile, "school">;

type eee = "철수" | "영희" | "훈이";
// let child1: eee = "맹구";
let child1: eee = "철수";

type fff = Record<eee, IProfile>;

type ggg = keyof IProfile;
let myProfile: ggg = "hobby";

interface IProfile {
  candy: number;
}
let profile: Partial<IProfile> = {
  name: "kitty",
  age: 10,
  candy: 3,
};
