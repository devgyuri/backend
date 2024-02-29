import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
  IProductsServiceCheckSoldout,
  IProductsServiceDelete,
  IProductsServiceMakeTags,
} from './interfaces/products-service.interface';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';
import { ProductsTagsService } from '../productsTags/productsTags.service';
import { ProductTag } from '../productsTags/entities/product.tag.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly productsSaleslocationsService: ProductsSaleslocationsService,
    private readonly productsTagsService: ProductsTagsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    const result = await this.productsSaleslocationsService.create({
      productSaleslocation,
    });

    const tags = await this.makeTags({ productTags });

    const result2 = this.productsRepository.save({
      ...product,
      productSaleslocation: result,
      productCategory: {
        id: productCategoryId,
      },
      productTags: tags,
    });

    return result2;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    const product = await this.findOne({ productId });

    this.checkSoldout({ product });

    const { productTags, ...updateProduct } = updateProductInput;

    const tags = await this.makeTags({ productTags });

    const result = this.productsRepository.save({
      ...product,
      ...updateProduct,
      productTags: tags,
    });
    return result;
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  checkSoldout({ product }: IProductsServiceCheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }
  }

  async makeTags({
    productTags,
  }: IProductsServiceMakeTags): Promise<(ProductTag | ObjectLiteral)[]> {
    const tagNames = productTags.map((el) => el.replace('#', ''));
    const prevTags = await this.productsTagsService.findByNames({ tagNames });

    const temp = [];
    tagNames.forEach((el) => {
      const exists = prevTags.find((prevEl) => el === prevEl.name);
      if (!exists) {
        temp.push({ name: el });
      }
    });
    const newTags = await this.productsTagsService.bulkInsert({ names: temp });

    const tags = [...prevTags, ...newTags.identifiers];

    return tags;
  }
}
