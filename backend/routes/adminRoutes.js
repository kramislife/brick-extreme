import express from "express";
import {
  deleteAllProducts,
  deleteProductByID,
  deleteProductImage,
  newProduct,
  updateProduct,
  uploadProductImage,
} from "../controllers/productController.js";

import {
  createCategory,
  deleteCategoryByID,
  updateCategory,
} from "../controllers/categoryController.js";

import {
  createCollection,
  deleteCollectionByID,
  updateCollection,
} from "../controllers/collectionControler.js";
import {
  createDesigners,
  deleteDesignerById,
  updateDesignerById,
} from "../controllers/designerController.js";
import {
  createSkillLevel,
  deleteSkillByID,
  updateSkillLevel,
} from "../controllers/skillLevelController.js";
import {
  isAuthenticatedUser,
  isAuthorizedUser,
} from "../middlewares/auth.middleware.js";

import { userRoles } from "../Utills/Roles.js";
import {
  deleteSingleUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
} from "../controllers/adminController.js";

const router = express.Router();

// ---------------------------------- CATEGORIES --------------------------------------------------

// CREATE NEW CATEGORIES
router
  .route("/admin/newCategory")
  .post(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    createCategory
  );

// UPDATE A CATEGORIES BY ADMIN
router
  .route("/admin/categories/:id")
  .put(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    updateCategory
  );

// DELETE A CATEGORIES BY ADMIN
router
  .route("/admin/categories/:id")
  .delete(
    (isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    deleteCategoryByID)
  );

// ---------------------------------- COLLECTION --------------------------------------------------

// CREATE NEW COLLECTION
router
  .route("/admin/newCollection")
  .post(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    createCollection
  );

// UPDATE A COLLECTION BY ADMIN
router
  .route("/admin/collections/:id")
  .put(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    updateCollection
  );

// DELETE A COLLECTION BY ADMIN
router
  .route("/admin/collections/:id")
  .delete(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    deleteCollectionByID
  );

// ---------------------------------- SKILL --------------------------------------------------

// CREATE NEW SKILLS
router
  .route("/admin/newSkillLevel")
  .post(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    createSkillLevel
  );

// UPDATE A SKILLS BY ADMIN
router
  .route("/admin/skillLevels/:id")
  .put(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    updateSkillLevel
  );

// DELETE A SKILLS BY ADMIN
router
  .route("/admin/skillLevels/:id")
  .delete(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    deleteSkillByID
  );

// ---------------------------------- DESIGNER --------------------------------------------------
// CREATE NEW DESIGNER
router
  .route("/admin/newDesigner")
  .post(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    createDesigners
  );

// UPDATE A COLLECTION BY ADMIN
router
  .route("/admin/designers/:id")
  .put(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    updateDesignerById
  );

// DELETE A DESIGNER BY ADMIN
router
  .route("/admin/designers/:id")
  .delete(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    deleteDesignerById
  );

// ---------------------------------- PRODUCTS --------------------------------------------------

// CREATE NEW PRODUCT
router
  .route("/admin/newProduct")
  .post(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE,
      userRoles.SELLER
    ),
    newProduct
  );

// UPDATE A PRODUCT BY ADMIN
router
  .route("/admin/product/:id")
  .put(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE,
      userRoles.SELLER
    ),
    updateProduct
  );

// DELETE A PRODUCT BY ADMIN
router
  .route("/admin/product/:id")
  .delete(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    deleteProductByID
  );

// UPLOAD PRODUCT IMAGE
router
  .route("/admin/products/:id/upload_images")
  .patch(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    uploadProductImage
  );

// DELETE PRODUCT IMAGE
router
  .route("/admin/products/:id/delete_images")
  .delete(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    deleteProductImage
  );

// DELETE ALL PRODUCTS
router
  .route("/admin/products")
  .delete(
    isAuthenticatedUser,
    isAuthorizedUser(userRoles.SUPER_ADMIN, userRoles.ADMIN),
    deleteAllProducts
  );

// ---------------------------------- PRODUCTS --------------------------------------------------

// GET ALL USERS
router
  .route("/admin/users")
  .get(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    getAllUsers
  );

// GET SPECIFIC USER
router
  .route("/admin/users/:id")
  .get(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    getSingleUser
  );

// UPDATE SPECIFIC USER INFORMATION

router
  .route("/admin/users/:id")
  .patch(
    isAuthenticatedUser,
    isAuthorizedUser(
      userRoles.SUPER_ADMIN,
      userRoles.ADMIN,
      userRoles.EMPLOYEE
    ),
    updateSingleUser
  );

// DELETE SPECIFIC USER
router
  .route("/admin/users/:id")
  .delete(
    isAuthenticatedUser,
    isAuthorizedUser(userRoles.SUPER_ADMIN, userRoles.ADMIN),
    deleteSingleUser
  );

export default router;
