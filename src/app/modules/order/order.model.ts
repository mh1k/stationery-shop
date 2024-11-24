import mongoose, { model, Schema } from 'mongoose';
import { IOrder, OrderIModel } from './order.interface';
import { ProductModel } from '../product/product.model';

const orderSchema = new Schema<IOrder, OrderIModel>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: 'In valid email. Please provide a valid email',
      },
    },
    product: { type: String, required: [true, 'Product ref is required'] },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      validate: {
        validator: function (value) {
          return value > 0; // for ensuring the quantity is a positive number.
        },
        message: 'Quantity must be a positive number and minimum is one',
      },
    },
    totalPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          return value > 0; // for ensuring the totalPrice is a positive number.
        },
        message: 'Total Price must be a positive number',
      },
    },
  },
  {
    timestamps: true, //  createdAt date and updatedAt date
  },
);

// custom static method for Implement product Inventory Management Logic
orderSchema.statics.refProductUpdate = async function (orderData: IOrder) {
  // by default mongoose give Invalid Object ID error if it doesn't match in product model
  // if it doesn't match that means it's invalid product ref..
  if (!mongoose.Types.ObjectId.isValid(orderData.product)) {
    throw new Error('Product not found');
  }
  //get product data from Product Model
  const refProduct = await ProductModel.findById(orderData.product);

  if (!refProduct) {
    throw new Error('Product not found');
  }

  if (refProduct.quantity < orderData?.quantity) {
    if (refProduct.quantity === 0) {
      throw new Error('Product out of stock');
    } else {
      throw new Error(`${refProduct.quantity} quantity avilable`); // how many quantity is avilable
    }
  }
  //reducing the product quanity
  refProduct.quantity -= orderData?.quantity;
  if (refProduct.quantity === 0) {
    refProduct.inStock = false;
  }
  // update the product after calculation
  await ProductModel.findByIdAndUpdate(orderData?.product, refProduct, {
    new: true,
  });
};

export const OrderModel = model<IOrder, OrderIModel>('order', orderSchema);
