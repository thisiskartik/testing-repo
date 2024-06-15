import mongoose from "mongoose";
const { Schema } = mongoose;

const universitySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	courses: [
		{
			type: Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});

const University = mongoose.model("University", universitySchema);

export default University;
