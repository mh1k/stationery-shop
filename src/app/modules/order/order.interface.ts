import { Model } from 'mongoose';

export interface IOrder {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
}

// custom static method for product Inventory Management Logic
export interface OrderIModel extends Model<IOrder> {
  refProductUpdate(order: IOrder): Promise<IOrder | null>;
}
