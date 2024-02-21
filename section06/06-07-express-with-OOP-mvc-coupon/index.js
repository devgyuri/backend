import express from "express";
import { ProductController } from "./mvc/collections/product.controller.js";
import { CouponController } from "./mvc/collections/coupon.controller.js";

const app = express();

const productController = new ProductController();
app.post("/products/buy", productController.buyProduct);
app.post("/products/refund", productController.refundProduct);

const CouponController = new CouponController();
app.post("/coupons/buy", CouponController.buyCoupon());

app.listen(3000);
