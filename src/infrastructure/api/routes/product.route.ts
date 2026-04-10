import express, { Request, Response } from "express";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const usecase = new ListProductUseCase(new ProductRepository());
    const output = await usecase.execute({});

    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
