import express from "express";
const app = express();

app.get("/qqq", function (req, res) {
  res.send("Hello Kitty");
});

app.listen(3000);
