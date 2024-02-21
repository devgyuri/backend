export class ProductController {
  cashService;
  productService;

  constructor(cashService, productService) {
    this.cashService = cashService;
    this.productService = productService;
  }

  buyProduct = (req, res) => {
    const hasMoney = this.cashService.checkValue();
    const isSoldOut = this.productService.checkSoldout();

    if (hasMoney && !isSoldOut) {
      res.send("구매완료");
    }
  };

  refundProduct = (req, res) => {
    const isSoldOut = this.productService.checkSoldout();

    if (isSoldOut) {
      res.send("상품 환불 완료");
    }
  };
}
