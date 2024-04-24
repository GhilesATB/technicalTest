const express = require("express");
const {index, store, view, update, destroy,} = require("../app/products/http/controllers/productsController");
const {validateProduct, validateProductUpdate} = require("../app/products/http/requests/productRequest");
const { parseMultipart } = require("../app/common/middlewares/multipart");

const productRouter = express();

productRouter.get("/products", index);
productRouter.post("/products", parseMultipart, validateProduct(), store);
productRouter.get("/products/:productId", view);
productRouter.put("/products/:productId", parseMultipart, validateProductUpdate(), update);
productRouter.delete("/products/:productId", destroy);

module.exports = productRouter;