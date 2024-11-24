import { Request, Response } from 'express';
import { OrderService } from './order.service';

// to create order through orderService
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req?.body;
    const result = await OrderService.createOrderIntoDB(order);

    // respond with a success message
    res.status(200).json({
      status: true,
      message: 'Order create successfully',
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error?.message : 'something went wrong';
    const errorStack =
      error instanceof Error ? error?.stack : 'something went wrong';
    if (
      errorMessage === 'Product out of stock' ||
      errorMessage === 'Product not found' ||
      errorMessage === 'This email already exist' ||
      errorMessage.includes('quantity avilable')
    ) {
      res.status(404).json({
        success: false,
        error: errorMessage,
      });
    } else {
      res.status(500).json({
        success: false,
        message: error,
        stack: errorStack,
      });
    }
  }
};

// get all order from Database
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrderFromDB();
    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// get the total revenue generated from all orders
const getAllOrderRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getAllOrderRevenueFromDB();
    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: { totalRevenue: result[0]?.totalRevenue || 0 },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// delete the order by unique id through calling order service
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.orderID;
    const result = await OrderService.deleteOrderIntoDB(id);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Order deleted successfully',
        data: {},
      });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error?.name : 'Something went wrong';
    const stackError = error instanceof Error ? error?.stack : undefined;
    if (errorMessage === 'CastError') {
      res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    } else {
      res.status(400).json({
        success: false,
        message: errorMessage,
        error: error,
        stack: stackError,
      });
    }
  }
};

export const OrderController = {
  createOrder,
  getAllOrder,
  getAllOrderRevenue,
  deleteOrder,
};
