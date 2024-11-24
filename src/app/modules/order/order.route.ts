import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

// to create order route
router.post('/create-order', OrderController.createOrder);

// to get orders route
router.get('/', OrderController.getAllOrder);

// to delete order route
router.get('/:orderID', OrderController.deleteOrder);

// to get total revenue route
router.get('/revenue', OrderController.getAllOrderRevenue);

export const OrderRoute = router;
