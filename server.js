const express = require("express");
const app = express();
const PORT = 8080;

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

app.use(express.json());

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

app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === parseInt(id));
  res.send(product);
});

app.post("/products", (req, res) => {
  const product = req.body;
  product.id = products.length + 1;
  products.push(product);
  res.send(product);
});

app.put("/products/:id", (req, res) => {
  const product = req.body;
  const id = req.params.id;
  const dbProduct = products[parseInt(id) - 1];
  products[parseInt(id) - 1] = Object.assign(dbProduct, product);
  res.send(product);
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  products.splice(parseInt(id) - 1, 1);
  res.send({ success: true });
});
