import { IProduct } from './product.interface';
import { ProductModel } from './product.model';

// this function creating product into database
const createProductIntoDB = async (productData: IProduct) => {
  const result = await ProductModel.create(productData);
  return result;
};

// this function getting all products from database by query search
const getAllProductFromDB = async (querySearch: string) => {
  const query = querySearch
    ? {
        $or: [
          { name: querySearch },
          { brand: querySearch },
          { category: querySearch },
        ],
      }
    : {};
  const result = await ProductModel.find(query);
  return result;
};

// this function getting single product by _id
const getSingleProductFromDB = async (productID: string) => {
  const result = await ProductModel.findById(productID);
  return result;
};

//this function update the product into database by _id
const updateProductIntoDB = async (id: string, product: Partial<IProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, product, {
    new: true,
  });
  return result;
};

// this function delete the product to database by _id
const deleteProductIntoDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id, {
    new: true,
  });
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};
