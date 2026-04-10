import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
}

describe("CreateProductUseCase unit tests", () => {
  it("should create a product with valid input", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: 100,
    };

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: "",
      price: 100,
    };

    await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: -1,
    };

    await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
  });

  it("should throw multiple errors when name is missing and price is less than zero", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: "",
      price: -1,
    };

    await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
  });
});
