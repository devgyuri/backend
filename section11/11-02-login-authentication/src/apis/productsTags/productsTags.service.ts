import { Injectable } from '@nestjs/common';
import { In, InsertResult, Repository } from 'typeorm';
import { ProductTag } from './entities/product.tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsTagsServiceBulkInsert,
  IProductsTagsServiceFindByNames,
} from './interfaces/products-tags-service.interface';

@Injectable()
export class ProductsTagsService {
  constructor(
    @InjectRepository(ProductTag)
    private readonly productsTagsRepository: Repository<ProductTag>,
  ) {}

  findByNames({
    tagNames,
  }: IProductsTagsServiceFindByNames): Promise<ProductTag[]> {
    return this.productsTagsRepository.find({
      where: { name: In(tagNames) },
    });
  }

  bulkInsert({ names }: IProductsTagsServiceBulkInsert): Promise<InsertResult> {
    return this.productsTagsRepository.insert([...names]);
  }
}
