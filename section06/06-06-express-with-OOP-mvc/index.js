import express from "express";
import { ProductController } from "./mvc/collections/product.controller.js";

const app = express();

const productController = new ProductController();

app.post("/products/buy", productController.buyProduct);
app.post("/products/refund", productController.refundProduct);

app.listen(3000);
