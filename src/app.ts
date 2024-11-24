import express from 'express';
import { ProductRoute } from './app/modules/product/product.route';
import { OrderRoute } from './app/modules/order/order.route';
const app = express();

//persers
app.use(express());
app.use(express.json());

//product route
app.use('/api/products', ProductRoute);

// order router
app.use('/api/orders', OrderRoute);

app.get('/', (req, res) => {
  res.send('server is running!!!');
});

export default app;
