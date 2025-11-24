import ErrorHandler from "../types/utility.js";
import { Product } from "../models/product.js";
import { tryCatch } from "../middlewares/errorHandler.js";
import { Request, Response, NextFunction } from "express";
import { BaseQuery, newProductType } from "../types/product.js";
import { rm } from "fs";
import { SearchRequestQuery } from "../types/product.js";
import { faker } from "@faker-js/faker";
import { myCache } from "../app.js";

export const newProduct = tryCatch(
  async (
    req: Request<{}, {}, newProductType>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, stock, price, category } = req.body;
    const photo = req.file;

    if (!name || !stock || !price || !category) {
      return next(new ErrorHandler("Please fill all the required fields", 400));
    }

    if (!photo) {
      return next(new ErrorHandler("Please upload a photo", 400));
    }

    await Product.create({
      name,
      price: String(price),
      stocks: String(stock),
      category: category.toLowerCase(),
      photo: photo.path,
    });
    return res.status(200).json({
      success: true,
      message: "Product created SuccessFully",
    });
  }
);

export const getLatestProduct = tryCatch(async (req, res, next) => {
  let product;
  if (myCache.has("latest-product")) {
    product = JSON.parse(myCache.get("latest-product") as string);
  } else {
    product = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    myCache.set("latest-product", JSON.stringify(product));
  }

  return res.status(200).json({
    success: true,
    product,
  });
});

export const getAllCategories = tryCatch(async (req, res, next) => {
  const categories = await Product.distinct("category");

  return res.status(200).json({
    success: true,
    categories,
  });
});

export const getAdminProducts = tryCatch(async (req, res, next) => {
  const products = await Product.find({});

  return res.status(200).json({
    success: true,
    products,
  });
});
export const getSingleProduct = tryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  return res.status(200).json({
    success: true,
    product,
  });
});

export const updateProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, stock, price, category } = req.body;
  const product = await Product.findById(id);
  const photo = req.file;
  if (!product) {
    return next(new ErrorHandler("No Product found ", 404));
  }
  if (photo) {
    rm(product.photo, () => {
      console.log("old deleted");
    });
    product.photo = photo.path;
  }
  if (name) product.name = name;
  if (stock) product.stock = stock;
  if (price) product.price = price;
  if (category) product.category = category;
  await product.save();

  return res.status(200).json({
    success: true,
    message: "product Updated succesfuly",
  });
});

export const deleteProduct = tryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  rm(product?.photo!, () => {
    console.log("product photo deletd");
  });
  await product?.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Product deletd Successfully",
  });
});

export const getAllProducts = tryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const basequery: BaseQuery = () => {};
    if (search) {
      basequery.name = {
        $regex: search,
        $options: "i",
      };
    }
    if (price) {
      basequery.price = {
        $lte: Number(price),
      };
    }
    if (category) basequery.category = category;

    const productPromise = Product.find(basequery)
      .sort(sort ? { price: 1 } : undefined)
      .limit(limit)
      .skip(skip);

    const [product, filteredOnlyProduct] = await Promise.all([
      productPromise,
      Product.find(basequery),
    ]);

    const totalPages = Math.ceil(filteredOnlyProduct.length / limit);

    return res.status(200).json({
      success: true,
      product,
      totalPages,
    });
  }
);
// const generateRandomProduct = async (count: number) => {
//   const products = [];
//   for (let i = 0; i < count; i++) {
//     const product = {
//       name: faker.commerce.productName(),
//       stock: faker.commerce.price({ min: 500, max: 1500, dec: 0 }),
//       photo: "uploads/f496c677-1471-49f6-8f93-9a89c910a756.jpg",
//       category: faker.commerce.department(),
//       price: faker.commerce.price({ min: 5000, max: 15000, dec: 0 }),
//       createdAt: new Date(faker.date.past()),
//       updatedAt: new Date(faker.date.recent()),
//       _v: 0,
//     };

//     products.push(product);
//   }
//   await Product.create(products);
//   console.log("Generated", { success: true });
// };
// generateRandomProduct(10);
// const deleteRandomProduct = async (count: number) => {
//   const products = await Product.find({}).skip(3);

//   for (let i = 0; i < count; i++) {
//     const product = products[i];

//     await Product.deleteOne();
//   }
//   console.log("deleted");
// };
// deleteRandomProduct(10)
