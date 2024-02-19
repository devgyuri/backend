const profile = {
  name: "영희",
  age: 12,
  school: "다람쥐 초등학교",
};

const { name, school } = profile;
console.log(`name: ${name}`);
console.log(`school: ${school}`);

function zzz({ apple, banana }) {
  console.log(apple);
  console.log(banana);
}

const basket = {
  apple: 3,
  banana: 10,
};
zzz(basket);
