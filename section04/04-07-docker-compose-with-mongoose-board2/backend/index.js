import express from "express";
import { checkEmail, getWelcomeTemplate, setTemplateToEmail } from "./email.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import "dotenv/config.js";
import mongoose from "mongoose";
import { Board } from "./models/board.model.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get("/boards", async function (req, res) {
  const result = await Board.find();
  res.send(result);
});

app.post("/boards", async function (req, res) {
  console.log(req);
  console.log("==================");
  console.log(req.body);

  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents,
  });
  await board.save();

  res.send("게시물 등록에 성공하였습니다.");
});

mongoose.set("debug", true);

mongoose
  .connect("mongodb://my-database:27017/myDocker")
  .then(() => {
    console.log("***DB 접속에 성공하였습니다.***");
  })
  .catch(() => {
    console.log("***DB 접속에 실패하였습니다.***");
  });

app.listen(4000);
