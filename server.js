require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT;

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("MongoDB Connected");
});

app.use(express.json());
app.use("/products", productRouter);
app.use("/users", userRouter);

const logger = (req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`);
  next();
};

app.use(logger);

app.listen(PORT, () => {
  console.log("Server is up and running");
});

app.get("/", (req, res) => {
  console.log("We are handling / ");
  res.send("Hello world from express");
});
