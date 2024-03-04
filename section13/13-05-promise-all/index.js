const fetchData = async () => {
  console.time("=== 개별 promise ===");
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공");
    }, 2000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공");
    }, 3000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공");
    }, 1000);
  });

  console.timeEnd("=== 개별 promise ===");
};

const fetchData2 = async () => {
  console.time("=== promise.all ===");

  const results = await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공");
      }, 2000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공");
      }, 3000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공");
      }, 1000);
    }),
  ]);

  console.log(results);
  console.timeEnd("=== promise.all ===");
};

fetchData();
fetchData2();
