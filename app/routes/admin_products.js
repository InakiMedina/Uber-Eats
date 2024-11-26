const express = require("express");
const router = express.Router();
const product = require("../controllers/product");
const { DataHandler } = require("../controllers/product_handler");

const ProductHandler = new DataHandler()

router.post("/", async (req, res) => {
  if (!req.body.product) return res.sendStatus(400);

  try {
    product.Product.validateNewProduct(req.body.product);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error.errorMessage);
  }

  const newProd = await ProductHandler.createProduct(req.body.product);

  return res.status(200).send(newProd.toJson());
});

router.put("/:id", async (req, res) => {
  let prod = undefined;
  try {
    prod = await ProductHandler.updateProduct(req.params.id, req.body.product);
    if (!prod) return res.status(404).send("product not found");
  } catch (error) {
    return res.status(400).send(error.errorMessage);
  }

  return res.status(200).send(`${prod.title} succesfully updated`);
});

router.delete("/:id", async (req, res) => {
  const prod = await ProductHandler.deleteProduct(req.params.id);
  if (!prod) return res.status(404).send("product not found");
  console.log({prod})

  return res.status(200).send(`${prod.title} succesfully deleted`);
});

module.exports = router;
