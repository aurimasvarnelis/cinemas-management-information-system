import nextConnect from "next-connect";
import { dbMiddleware } from "../../../../middlewares/dbMiddleware";
import { getCinema, putCinema, deleteCinema } from "../../../../controllers/cinemaController";

const handler = nextConnect({
	onError: (err, req, res, next) => {
		console.error(err.stack);
		res.status(500).end("Something broke!");
	},
	onNoMatch: (req, res) => {
		res.status(404).end("Page is not found");
	},
})
	.use(async (req, res, next) => {
		await dbMiddleware(req, res, next);
	})
	.get(async (req, res) => {
		const result = await getCinema(req.query.cinemaId);
		res.send(result);
	})
	.put(async (req, res) => {
		const result = await putCinema(req);
		res.send(result);
	})
	.delete(async (req, res) => {
		const result = await deleteCinema(req);
		res.send(result);
	});

export default handler;
