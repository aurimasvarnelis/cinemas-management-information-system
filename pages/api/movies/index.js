import nextConnect from 'next-connect'
import { dbMiddleware } from "../../../middlewares/dbMiddleware"
import { getMovies, postMovie } from "../../../controllers/movieController"

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
    const result = await getMovies(req);
    res.send(result);
  })
  .post(async (req, res) => {
    const result = await postMovie(req);
    res.send(result);
  });

  export default handler;