import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refresAccessToken,
  registerUser,
  updeateUserDetails,
  getAllUsers,
  deleteUser
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { AdminOnly, protect } from "../middleware/new.middleware.js";

const router = Router();

router.route("/register").post( registerUser );
router.route("/login").post(loginUser);

// secured routes can be added here
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refresAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-details").patch(verifyJWT, updeateUserDetails);
router.route("/all-users").get(verifyJWT, AdminOnly, getAllUsers);
router.route("/delete/:id").delete(verifyJWT, AdminOnly, deleteUser);

export default router;
