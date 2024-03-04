const fetchData = async () => {
  const result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log("이미지 받아옴");
        resolve("강아지.jpg");
      } catch (error) {
        reject("error");
      }
    }, 5000);
  });

  console.log(result);
  console.log("받아온 이미지 브라우저에 전달");
};

fetchData();
