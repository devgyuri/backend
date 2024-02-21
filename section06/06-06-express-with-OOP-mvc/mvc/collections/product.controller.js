import { CashService } from "./services/cash.service.js";
import { ProductService } from "./services/product.service.js";

export class ProductController {
  buyProduct = (req, res) => {
    const cashService = new CashService();
    const hasMoney = cashService.checkValue();

    const productService = new ProductService();
    const isSoldOut = productService.checkSoldout();

    if (hasMoney && !isSoldOut) {
      res.send("구매완료");
    }
  };

  refundProduct = (req, res) => {
    const productService = new ProductService();
    const isSoldOut = productService.checkSoldout();

    if (isSoldOut) {
      res.send("상품 환불 완료");
    }
  };
}
