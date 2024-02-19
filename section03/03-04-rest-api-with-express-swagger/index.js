import express from "express";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get("/boards", function (req, res) {
  const result = [
    { number: 1, writer: "철수", title: "안녕", contents: "내용내용" },
    { number: 2, writer: "영희", title: "너의 이름은", contents: "무엇이니" },
    { number: 3, writer: "맹구", title: "...", contents: "잘 부탁해" },
  ];
  res.send(result);
});

app.post("/boards", function (req, res) {
  console.log(req);
  console.log("==================");
  console.log(req.body);

  res.send("게시물 등록에 성공하였습니다.");
});

app.post("/tokens/phone", (req, res) => {
  const myPhone = req.body.phone;

  const isValid = checkPhone(myPhone);
  if (isValid === false) {
    return;
  }

  const myToken = getToken();
  sendTokenToSMS(myPhone, myToken);

  res.send("인증 완료");
});

app.listen(3000);
