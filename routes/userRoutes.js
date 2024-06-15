import express from "express";
import {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	addMentorInfo,
	approveMentorInfo,
} from "../controllers/userController.js";
import { protect, protectMentor, protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/addMentorInfo").post(protect, protectMentor, addMentorInfo);
router.route("/approveMentor").post(protect, protectAdmin, approveMentorInfo);

export default router;
