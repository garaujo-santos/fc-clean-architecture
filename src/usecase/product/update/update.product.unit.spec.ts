import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.createProductA("Product 1", 10);

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  }
}

describe("Unit test for update product use case", () => {
  it("should update a product", async () => {
    const repository = MockRepository();
    const usecase = new UpdateProductUseCase(repository);

    const input = {
      id: product.id,
      name: "Product 1 Updated",
      price: 20,
    }

    const output = {
      id: product.id,
      name: "Product 1 Updated",
      price: 20,
    }

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(repository.update).toHaveBeenCalled();
    expect(result).toEqual(output);
  });
});