import express from "express";
import {
  newProduct,
  getLatestProduct,
  getAllCategories,
  getAdminProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
} from "../controller/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

app.post("/newProduct", singleUpload, newProduct);
app.get("all",getAllProducts)
app.get("/latest", getLatestProduct);
app.get("/categories", getAllCategories);
app.get("/admin-products", getAdminProducts);
app
  .route("/:id")
  .get(getSingleProduct)
  .put(singleUpload, updateProduct)
  .delete(deleteProduct);

export default app;
