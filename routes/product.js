const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Product = require("../models/product");

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

router.use(verifyJWT);

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.send(product);
  } catch (err) {
    res.status(404).send({ error: "Product not found" });
  }
});

router.post("/", async (req, res) => {
  const user = req.user;
  console.log({ user });
  if (user && user.role === "ADMIN") {
    const product = req.body;
    const dbProduct = await Product.create(product);
    res.send(dbProduct);
  } else {
    res.status(401).send({ error: "Not authorized - test!" });
  }
});

// router.put("/:id", (req, res) => {
//   const product = req.body;
//   const id = req.params.id;
//   const dbProduct = products[parseInt(id) - 1];
//   products[parseInt(id) - 1] = Object.assign(dbProduct, product);
//   res.send(product);
// });

// router.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   products.splice(parseInt(id) - 1, 1);
//   res.send({ success: true });
// });

module.exports = router;
