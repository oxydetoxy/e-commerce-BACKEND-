import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { InavlidateTypes } from "../types/utility.js";
export const inavalidateCache = async ({
  product,
  order,
  admin,
}: InavlidateTypes) => {
  const productKeys: string[] = [
    "latest-products",
    "categories",
    "all-products",
  ];
  const products = await Product.find({}).select("_id");
  products.forEach((i) => {
    const id = i._id;
    productKeys.push(`product-${id}`);
  });
  myCache.del(productKeys);
};
