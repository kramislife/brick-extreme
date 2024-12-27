import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Color from "../models/color.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";

// -------------------------------------- GET ALL DESIGNERS => GET /designers --------------------------------------

export const getAllColors = catchAsyncErrors(async (req, res, next) => {
  const prod_color = await Color.find();

  if (!prod_color) {
    return res.status(404).json({ message: "No colors found" });
  }
  res.status(200).json({
    message: `${colors.length} colors found`,
    prod_color,
  });
});

// -------------------------------------- GET ALL DESIGNERS => GET /designers/:id --------------------------------------

export const getColorById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const prod_color = await Color.findById(id);

  if (!prod_color) {
    return next(new ErrorHandler("Color not found"), 404);
  }
  res.status(200).json({
    message: "Color Found",
    prod_color,
  });
});

// -------------------------------------- CREATE NEW DESIGNER => POST admin/newDesigners --------------------------------------

export const createColor = catchAsyncErrors(async (req, res, next) => {
  const newColor = await Color.create(req.body);

  if (!newColor) {
    return next(new ErrorHandler("Failed to create new Color", 400));
  }

  res.status(201).json({
    message: "New Color created successfully",
    newColor,
  });
});

// -------------------------------------- UPDATE A DESIGNER => PUT admin/designers/:id --------------------------------------

export const updateColorById = catchAsyncErrors(async (req, res, next) => {
  const updatedColor = await Color.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedColor) {
    return next(new ErrorHandler("Failed to update color", 400));
  }

  res.status(200).json({
    message: "Color updated successfully",
    updatedColor,
  });
});

// -------------------------------------- DELETE A DESIGNER => DELETE admin/designers/:id --------------------------------------

export const deleteColorbyId = catchAsyncErrors(async (req, res, next) => {
  const deletedColor = await Designer.findByIdAndDelete(req.params.id);

  if (!deletedColor) return next(new ErrorHandler("Designer not found", 404));

  res.status(200).json({
    message: "Color Deleted",
    deletedColor,
  });
});
