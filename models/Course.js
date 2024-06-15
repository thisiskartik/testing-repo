import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
	},
	instructor: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	enrolled: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],

	videos: [
		{
			type: Schema.Types.ObjectId,
			ref: "Video",
		},
	],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
