import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
	let token;

	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.userId).select("-password");

			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	} else {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});

const protectAdmin = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		res.status(401);
		throw new Error("Not authorized as an admin");
	}
};

const protectVolunteer = (req, res, next) => {
	if (req.user && req.user.role === "volunteer") {
		next();
	} else {
		res.status(401);
		throw new Error("Not authorized as a volunteer");
	}
};

const protectStudent = (req, res, next) => {
	if (req.user && req.user.role === "student") {
		next();
	} else {
		res.status(401);
		throw new Error("Not authorized as a student");
	}
};

const protectTeacher = (req, res, next) => {
	if (req.user && req.user.role === "teacher") {
		next();
	} else {
		res.status(401);
		throw new Error("Not authorized as a teacher");
	}
};

export { protect, protectAdmin };