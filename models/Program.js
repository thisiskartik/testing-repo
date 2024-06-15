import mongoose from "mongoose";
const { Schema } = mongoose;

const programSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	courses: [
		{
			type: Schema.Types.ObjectId,
			ref: "Course",
		},
	],

	universities: [
		{
			type: Schema.Types.ObjectId,
			ref: "University",
		},
	],

	description: {
		type: String,
		required: true,
	},

	image: {
		type: String,
	},
});

const Program = mongoose.model("Program", programSchema);

export default Program;
