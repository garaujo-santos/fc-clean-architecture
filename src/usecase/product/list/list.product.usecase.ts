import Product from "../../../domain/product/entity/product";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;
  
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
    const products = await this.productRepository.findAll();
    return {
      products: products.map((product: Product) => ({
        id: product.id,
        name: product.name,
        price: product.price
      }))
    }
  }
}