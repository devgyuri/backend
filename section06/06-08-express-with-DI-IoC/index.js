import express from "express";
import { ProductController } from "./mvc/collections/product.controller.js";
import { CouponController } from "./mvc/collections/coupon.controller.js";
import { CashService } from "./mvc/collections/services/cash.service.js";
import { ProductService } from "./mvc/collections/services/product.service.js";
import { PointService } from "./mvc/collections/services/point.service.js";

const app = express();

const cashService = new CashService();
const productService = new ProductService();
const pointService = new PointService();

const productController = new ProductController(cashService, productService);
app.post("/products/buy", productController.buyProduct);
app.post("/products/refund", productController.refundProduct);

const couponController = new CouponController(pointService);
app.post("/coupons/buy", couponController.buyCoupon);

app.listen(3000);
