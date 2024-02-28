import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSaleslocation } from './entities/product.saleslocation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsSaleslocationsService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly productsSaleslocationsRepository: Repository<ProductSaleslocation>,
  ) {}

  create({ productSaleslocation }): Promise<ProductSaleslocation> {
    const result = this.productsSaleslocationsRepository.save({
      ...productSaleslocation,
    });
    return result;
  }
}
