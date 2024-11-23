import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.model.js";
import API_Filters from "../Utills/apiFilters.js";
import ErrorHandler from "../Utills/customErrorHandler.js";

//------------------------------------  GET ALL PRODUCT => GET /products  ------------------------------------

export const getProduct = catchAsyncErrors(async (req, res, next) => {

  // API Filters & Search

  const resPerPage = 9;

  const apiFilters = new API_Filters(Product, req.query).search().filters();

  let products = await apiFilters.query;

  if (!products) {
    return next(new ErrorHandler(404, "No Products Found"));
  }

  let filteredProductCount = products?.length;

  apiFilters.pagination(resPerPage);

  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    message: `${filteredProductCount} Products retrieved successfully`,
    products,
  });
});

//------------------------------------  GET A PRODUCT BY ID  => GET /products/:id  ------------------------------------

export const getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  res.status(200).json({
    message: "Product retrieved successfully",
    product,
  });
});

// ---------------------------------------------------------------------  ADMIN ----------------------------------------------------------------

//------------------------------------  CREATE NEW PRODUCT BY ADMIN => POST  /admin/newProduct  ------------------------------------

export const newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  if (!product) {
    return next(new ErrorHandler("Failed to create product", 400));
  }

  res.status(201).json({
    message: "Product created successfully",
    product,
  });
});

//------------------------------------  UPDATE A PRODUCT BY ADMIN => PUT /admin/product/:id  ------------------------------------

export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req?.params?.id;

  const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  });

  if (!updatedProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    message: "Product updated successfully",
    updatedProduct,
  });
});

//------------------------------------  DELETE A PRODUCT BY ID  DELETE  => /admin/product/:id  ------------------------------------

export const deleteProductByID = catchAsyncErrors(async (req, res, next) => {
  const productId = req?.params?.id;
  const deletedProduct = await Product.findByIdAndDelete(productId);

  if (!deletedProduct) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    message: "Product deleted successfully",
    deletedProduct,
  });
});

//------------------------------------  DELETE ALL PRODUCTS  => /admin/product  ------------------------------------

export const deleteAllProducts = catchAsyncErrors(async (req, res, next) => {
  const deletedProducts = await Product.deleteMany();
  if (!deletedProducts) {
    return next(new ErrorHandler("Products can't be deleted", 400));
  }
  res.status(200).json({
    message: "All Products Deleted Successfully",
  });
});
