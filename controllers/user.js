import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			mentorInformation: user.role === "mentor" ? user.mentorInformation.role : undefined,
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, role } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const user = await User.create({
		name,
		email,
		password,
		role,
		mentorInformation: role === "mentor" ? { approval: false } : undefined,
	});

	if (user) {
		generateToken(res, user._id);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			mentorInformation: user.role === "mentor" ? user.mentorInformation : undefined,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

const logoutUser = (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ message: "Logged out successfully" });
};

const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			mentorInformation: user.role === "mentor" ? user.mentorInformation : undefined,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

const addMentorInfo = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.mentorInformation.qualification = req.body.qualification;
		user.mentorInformation.speciality = req.body.speciality;
		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			role: updatedUser.role,
			mentorInformation: updatedUser.mentorInformation,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

const approveMentorInfo = asyncHandler(async (req, res) => {
	const user = await User.findById(req.body.mentorId);
	console.log(user);
	if (user) {
		user.mentorInformation.approval = true;
		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			role: updatedUser.role,
			mentorInformation: updatedUser.mentorInformation,
		});
	} else {
		res.status(400);
		throw new Error("Mentor not found");
	}
});

export { authUser, registerUser, logoutUser, getUserProfile, addMentorInfo, approveMentorInfo };
