import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

//product validation schema
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [
        true,
        'Product name is required. Please provide a valid name.',
      ],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required. Please provide a valid brand name.'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required. Please specify the price.'],
      min: [0, 'Price must be a positive number.'],
      validate: {
        validator: function (value) {
          return value >= 0; // for ensuring the price is not negative.
        },
        message: 'Price must be a positive number ',
      },
    },
    category: {
      type: String,
      enum: {
        values: [
          'Writing',
          'Office Supplies',
          'Art Supplies',
          'Educational',
          'Technology',
        ],
        message:
          'Invalid category. Accepted values are: Writing, Office Supplies, Art Supplies, Educational, and Technology.',
      },
      required: [
        true,
        'Product category is required. Please choose a valid category.',
      ],
    },
    description: {
      type: String,
      required: [
        true,
        'Product description is required. Provide details about the product.',
      ],
    },
    quantity: {
      type: Number,
      required: [
        true,
        'Product quantity is required. Specify the stock amount.',
      ],
      validate: {
        validator: function (value) {
          return value > 0; // for ensuring the quantity is a positive number.
        },
        message: 'quantity must be a positive number ',
      },
    },
    inStock: {
      type: Boolean,
      required: [
        true,
        'Stock status is required. Specify if the product is in stock.',
      ],
      validate: {
        validator: (value) => typeof value === 'boolean',
        message:
          '{VALUE} is invalid value for inStock. It must be a boolean (true or false).',
      },
    },
  },
  {
    timestamps: true, //  createdAt date and updatedAt date
  },
);

// product model
export const ProductModel = model<IProduct>('product', productSchema);
