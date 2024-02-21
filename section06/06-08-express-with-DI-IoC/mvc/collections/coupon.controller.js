export class CouponController {
  pointService;

  constructor(pointService) {
    this.pointService = pointService;
  }

  buyCoupon = (req, res) => {
    const hasMoney = pointService.checkValue();

    if (hasMoney) {
      res.send("쿠폰 구매완료");
    }
  };
}
