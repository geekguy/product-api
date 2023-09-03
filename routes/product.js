const express = require("express");
const router = express.Router();

const products = [
  {
    name: "Apple",
    price: 100,
    description: "This is an apple",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c0d1b1a1e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    id: 1,
    category: "Fruits",
  },
  {
    name: "Banana",
    price: 200,
    description: "This is a banana",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c0d1b1a1e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    id: 2,
    category: "Fruits",
  },
];

router.get("/products", (req, res) => {
  res.send(products);
});

router.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === parseInt(id));
  res.send(product);
});

router.post("/products", (req, res) => {
  const product = req.body;
  product.id = products.length + 1;
  products.push(product);
  res.send(product);
});

router.put("/products/:id", (req, res) => {
  const product = req.body;
  const id = req.params.id;
  const dbProduct = products[parseInt(id) - 1];
  products[parseInt(id) - 1] = Object.assign(dbProduct, product);
  res.send(product);
});

router.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  products.splice(parseInt(id) - 1, 1);
  res.send({ success: true });
});

module.exports = router;
