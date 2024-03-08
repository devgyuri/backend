import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    console.log(event);

    const id = event.entity.id;
    const name = event.entity.name;
    const description = event.entity.description;
    const price = event.entity.price;
    const isSoldout = event.entity.isSoldout;

    console.log(`${id} ${name} ${description} ${price} ${isSoldout}`);
  }
}
