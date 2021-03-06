import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
	poster: {
		type: String,
	},
	name: {
		type: String,
	},
	director: {
		type: String,
	},
	actors: {
		type: String,
	},
	rating: {
		type: String,
		enum: ["G", "PG", "PG-13", "R", "NC-17"],
	},
	genre: {
		type: String,
		enum: [
			"Action",
			"Adventure",
			"Animation",
			"Comedy",
			"Crime",
			"Documentary",
			"Drama",
			"Family",
			"Fantasy",
			"History",
			"Horror",
			"Music",
			"Mystery",
			"Romance",
			"Sci-Fi",
			"Sport",
			"Thriller",
			"War",
			"Western",
		],
	},
	duration: {
		type: Number,
	},
	synopsis: {
		type: String,
	},
	cinemas: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Cinema",
		},
	],
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
