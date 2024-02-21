import express from "express";
const app = express();

app.post("/products/buy", (req, res) => {
  // 검증로직

  if (haveMoney && !isSoldOut) {
    res.send("구매완료");
  }
});

app.post("/products/refund", (req, res) => {
  // 검증 로직

  if (isSoldOut) {
    res.send("상품 환불 완료");
  }
});

app.listen(3000);
