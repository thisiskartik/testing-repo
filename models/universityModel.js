import mongoose from "mongoose";

const universitySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		courses: [
			{
				name: String,
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

const University = mongoose.model("University", universitySchema);

export default University;
