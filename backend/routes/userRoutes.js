import express from "express";
import {
  getProduct,
  getProductById,
} from "../controllers/productController.js";

import {
  getAllCategories,
  getCategoryById,
} from "../controllers/categoryController.js";

import {
  getAllCollections,
  getCollectionById,
} from "../controllers/collectionControler.js";

import {
  getAllSkillLevels,
  getSkillLevelById,
} from "../controllers/skillLevelController.js";
import {
  getAllDesigners,
  getDesignerById,
} from "../controllers/designerController.js";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";
import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getSingleAddress,
  updateAddress,
} from "../controllers/authController.js";

const router = express.Router();

// ---------------------------------- CATEGORIES --------------------------------------------------

// GET ALL CATEGORY
router.route("/categories").get(isAuthenticatedUser, getAllCategories);

// GET CATEGORIES BY ID
router.route("/categories/:id").get(isAuthenticatedUser, getCategoryById);

// ---------------------------------- COLLECTION --------------------------------------------------
// GET ALL COLLECTIONS
router.route("/collections").get(isAuthenticatedUser, getAllCollections);

// GET COLLECTION BY ID
router.route("/collections/:id").get(isAuthenticatedUser, getCollectionById);

// ---------------------------------- SKILL --------------------------------------------------
// GET ALL SKILLS
router.route("/skillLevels").get(getAllSkillLevels);

// GET SKILL BY ID
router.route("/skillLevels/:id").get(getSkillLevelById);

// ---------------------------------- DESIGNER --------------------------------------------------
// GET ALL DESIGNERS
router.route("/designers").get(getAllDesigners);

// GET DESIGNER BY ID
router.route("/designers/:id").get(getDesignerById);

// ---------------------------------- PRODUCTS --------------------------------------------------

// GET ALL PRODUCTS
router.route("/products").get(isAuthenticatedUser, getProduct);

// GET PRODUCT BY ID
router.route("/products/:id").get(getProductById);

// ---------------------------------------------------- ADDRESS ------------------------------------------------

// GET ALL ADDRESS

// CREATE NEW ADDRESS
router.route("/me/createAddress").post(isAuthenticatedUser, createAddress);

// UPDATE AN ADDRESS OF A USER
router.route("/me/addresses/:id").patch(isAuthenticatedUser, updateAddress);

// GET ALL ADDRESSES
router.route("/me/addresses").get(isAuthenticatedUser, getAllAddresses);

// GET SINGLE ADDRESS FOR A USER
router.route("/me/addresses/:id").get(isAuthenticatedUser, getSingleAddress);

// DELETE AN ADDRESS
router.route("/me/addresses/:id").delete(isAuthenticatedUser, deleteAddress);

export default router;
