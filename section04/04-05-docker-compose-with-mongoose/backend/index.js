import express from "express";
import { checkEmail, getWelcomeTemplate, setTemplateToEmail } from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import "dotenv/config.js";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.post("/users", (req, res) => {
  const { name, age, school, email } = req.body;

  const isValid = checkEmail(email);
  if (!isValid) {
    return;
  }

  const myTemplate = getWelcomeTemplate({ name, age, school });
  setTemplateToEmail(email, myTemplate);

  res.send("가입완료!");
});

mongoose
  .connect("mongodb://my-database:27017/myDocker")
  .then(() => {
    console.log("***DB 접속에 성공하였습니다.***");
  })
  .catch(() => {
    console.log("***DB 접속에 실패하였습니다.***");
  });

app.listen(4000);
