import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

describe("UpdateProductUseCase integration tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a persisted product with valid input", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const originalProduct = new Product("123", "Product 1", 10);

    await productRepository.create(originalProduct);

    const input: InputUpdateProductDto = {
      id: "123",
      name: "Product 1 Updated",
      price: 10
    };

    const output: OutputUpdateProductDto = {
      id: "123",
      name: "Product 1 Updated",
      price: 10
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const originalProduct = new Product("123", "Product 1", 10);

    await productRepository.create(originalProduct);

    const input: InputUpdateProductDto = {
      id: "123",
      name: "",
      price: 10
    };

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is less than zero", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const originalProduct = new Product("123", "Product 1", 10);

    await productRepository.create(originalProduct);

    const input: InputUpdateProductDto = {
      id: "123",
      name: "Product 1 Updated",
      price: -1
    };

    await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
  });
});