import { IOrder } from './order.interface';
import { OrderModel } from './order.model';

// The function creates an order in the database using the OrderModel.
const createOrderIntoDB = async (order: IOrder) => {
  const newOrder = new OrderModel(order); // Create a new instance for validation
  await newOrder.validate(); //it will check validation for email, product, quantity and total proce

  // user is exist or not
  const isExist = await OrderModel.findOne({ email: order.email });
  if (isExist) {
    throw new Error('This email already exist');
  }

  await OrderModel.refProductUpdate(order); // custom static metohd to Implement Product Inventory

  const result = await OrderModel.create(order);
  return result;
};

//  this function retrieves all orders from the database`
const getAllOrderFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

// this function retrieves the total revenue from all orders in the database
const getAllOrderRevenueFromDB = async () => {
  // using aggregate pipeline to calculate total revenue
  const result = await OrderModel.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    { $project: { totalRevenue: 1 } },
  ]);
  return result;
};

// export the Orderservice function to use in controller
export const OrderService = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getAllOrderRevenueFromDB,
};
