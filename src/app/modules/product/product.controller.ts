import { Request, Response } from 'express';
import { ProductService } from './product.service';

// create the product by calling Product service
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await ProductService.createProductIntoDB(product);
    res.status(200).json({
      success: true,
      message: 'product is created successfully',
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.name : 'Something went wrong';
    const stackError = error instanceof Error ? error?.stack : undefined;
    if (errorMessage === 'ValidationError') {
      res.status(500).json({
        success: false,
        message: 'Validation Faild',
        error: error,
        stack: stackError,
      });
    } else {
      res.status(500).json({
        success: false,
        error: error,
        stack: stackError,
      });
    }
  }
};

// get the all products by calling prodcut service
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const querySearch = req?.query?.searchTerm;
    const result = await ProductService.getAllProductFromDB(
      querySearch as string,
    );
    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Products not Found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        data: result,
      });
    }
  } catch (error) {
    const stackError = error instanceof Error ? error?.stack : undefined;
    res.status(500).json({
      success: false,
      error: error,
      stack: stackError,
    });
  }
};

// get the single product by unique id through calling prodcut service
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.productID;
    const result = await ProductService.getSingleProductFromDB(id);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product retrieved successfully',
        data: result,
      });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.name : 'Something went wrong';
    const stackError = error instanceof Error ? error?.stack : undefined;
    if (errorMessage === 'CastError') {
      res.status(404).json({
        success: false,
        message: 'Product is not found',
      });
    } else {
      res.status(500).json({
        success: false,
        error: error,
        stack: stackError,
      });
    }
  }
};

// update the single product by unique id through calling prodcut service
const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.productID;
    const product = req?.body;
    const result = await ProductService.updateProductIntoDB(id, product);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: result,
      });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.name : 'Something went wrong';
    const stackError =
      error instanceof Error ? error.stack : 'Something went wrong';
    if (errorMessage === 'CastError') {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Validation Faild',
        error: error,
        stack: stackError,
      });
    }
  }
};

// delete the product by unique id through calling prodcut service
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.productID;
    const result = await ProductService.deleteProductIntoDB(id);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
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
        message: 'Product not found',
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

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
