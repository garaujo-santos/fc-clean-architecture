import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.createProductA("Product 1", 10);
const product2 = ProductFactory.createProductA("Product 2", 20);

const MockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for listing products use case", () => {
    it("should list a products", async () => {
        const repository = MockRepository();
        const usecase = new ListProductUseCase(repository);
        const output = await usecase.execute({});
        expect(output.products.length).toBe(2);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });
});