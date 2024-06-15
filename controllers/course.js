import Course from "../models/Course.js";

export const getCourses = async (req, res) => {
	try {
		const courses = await Course.find();
		res.json(courses);
	} catch (error) {
		console.log(error);
	}
};
