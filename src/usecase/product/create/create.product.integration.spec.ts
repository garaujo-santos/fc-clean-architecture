import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

describe("CreateProductUseCase integration tests", () => {
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

  it("should create and persist a product with valid input", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input: InputCreateProductDto = {
      name: "Product 1",
      price: 10,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: "Product 1",
      price: 10,
    });

    const persistedProduct = await productRepository.find(result.id);

    expect(persistedProduct.id).toBe(result.id);
    expect(persistedProduct.name).toBe("Product 1");
    expect(persistedProduct.price).toBe(10);
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input: InputCreateProductDto = {
      name: "",
      price: 10,
    };

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is less than zero", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input: InputCreateProductDto = {
      name: "Product 1",
      price: -1,
    };

    await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
  });
});
