import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import SkillLevel from "../models/skillLevel.model.js";
import ErrorHandler from "../Utills/customErrorHandler.js";

// -------------------------------------- GET ALL SKILL => /skillLevels --------------------------------------

export const getAllSkillLevels = catchAsyncErrors(async (req, res, next) => {
  const skillLevels = await SkillLevel.find();

  if (!skillLevels) {
    return next(new ErrorHandler("No Skill level found"), 404);
  }

  res.status(200).json({
    message: `${skillLevels.length} Skills Retrieved Successfully`,
    skillLevels,
  });
});

// -------------------------------------- GET SKILL BY ID => /skillLevels/:id --------------------------------------

export const getSkillLevelById = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const skillLevel = await SkillLevel.findById(id);

  if (!skillLevel) {
    return next(new ErrorHandler("Skill level not found"), 404);
  }

  res.status(200).json({
    message: "Skill Retrieved Successfully",
    skillLevel,
  });
});

// -------------------------------------- CREATE NEW SKILL => /admin/newSkillLevel --------------------------------------

export const createSkillLevel = catchAsyncErrors(async (req, res) => {
  const newSkillLevel = await SkillLevel.create(req.body);

  if (!newSkillLevel) {
    return next(new ErrorHandler("Skill not found"), 404);
  }

  res.status(201).json({
    message: "Skill Level Created Successfully",
    newSkillLevel,
  });
});

// -------------------------------------- UPDATE A SKILL => /admin/skills/:id --------------------------------------

export const updateSkillLevel = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const updatedData = { ...req.body };

  const updatedSkillLevel = await SkillLevel.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
    }
  );

  if (updatedSkillLevel) {
    res.status(200).json({
      message: "Skill Level Updated Successfully",
      updatedSkillLevel,
    });
  }
});

// -------------------------------------- DELETE A SKILL => /admin/skills/:id --------------------------------------

export const deleteSkillByID = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const deletedSkillLevel = await SkillLevel.findByIdAndDelete(id);

  if (!deletedSkillLevel)
    return next(new ErrorHandler("Skill level not found"), 404);

  res.status(200).json({
    message: "Skill Level Deleted Successfully",
    deletedSkillLevel,
  });
});
