import express from "express";
import { CashService } from "./cash.js";
import { ProductService } from "./product.js";

const app = express();

app.post("/products/buy", (req, res) => {
  const cashService = new CashService();
  const hasMoney = cashService.checkValue();

  const productService = new ProductService();
  const isSoldOut = productService.checkSoldout();

  if (hasMoney && !isSoldOut) {
    res.send("구매완료");
  }
});

app.post("/products/refund", (req, res) => {
  const productService = new ProductService();
  const isSoldOut = productService.checkSoldout();

  if (isSoldOut) {
    res.send("상품 환불 완료");
  }
});

app.listen(3000);
