import { Request, Response, NextFunction } from "express";

export interface newProductType {
  name: String;
  stock: Number;
  category: String;
  photo: String;
  price: Number;
}

export interface SearchRequestQuery {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
}
export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: {
    $lte: number;
  };
  category?: string;
}
