import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product.category.entity';
import { productsCategoriesResolver } from './productsCategories.resolver';
import { ProductsCategoriesService } from './productsCategories.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  providers: [
    productsCategoriesResolver, //
    ProductsCategoriesService,
  ],
})
export class ProductsCategoriesModule {}
