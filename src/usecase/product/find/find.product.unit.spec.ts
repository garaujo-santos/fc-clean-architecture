import FindProductUseCase from "./find.product.usecase";

const product = {
  id: "123",
  name: "Product 1",
  price: 10,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
}


describe("FindProductUseCase unit tests", () => {
  it("should return a product by id", async () => {
    const productRepository = MockRepository();

    const usecase = new FindProductUseCase(productRepository);
    const result = await usecase.execute({ id: "123" });

    expect(result).toEqual(product);
  });

  it("should throw when product does not exist", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const usecase = new FindProductUseCase(productRepository);

    await expect(usecase.execute({ id: "123" }))
      .rejects.toThrow("Product not found");
  });
});

