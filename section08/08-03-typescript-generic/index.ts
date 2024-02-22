const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};
const result1 = getPrimitive("철수", 123, true);

//
//
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(100 + "hello");
  return [arg3, arg2, arg1];
};
const result2 = getAny("철수", 123, true);

//
//
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") {
    console.log(arg1);
  }
  return [arg3, arg2, arg1];
};
const result3 = getUnknown("철수", 123, true);

//
//
const getGeneric = <myType1, myType2, myType3>(arg1: myType1, arg2: myType2, arg3: myType3): [myType3, myType2, myType1] => {
  return [arg3, arg2, arg1];
};
const result4 = getGeneric<string, number, boolean>("철수", 123, true);

//
//
const getGeneric2 = <T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] => {
  return [arg3, arg2, arg1];
};
const result5 = getGeneric2<string, number, boolean>("철수", 123, true);
