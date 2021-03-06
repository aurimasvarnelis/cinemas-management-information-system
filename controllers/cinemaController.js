import Cinema from "../models/Cinema";

export async function getCinemas() {
	const cinemas = await Cinema.find({});
	return cinemas;
}

export async function getCinema(cinemaId) {
	const cinema = await Cinema.findById(cinemaId);
	return cinema;
}

export async function postCinema(req) {
	const cinema = await Cinema.create(req.body);
	return cinema;
}

export async function putCinema(req) {
	const cinema = await Cinema.findByIdAndUpdate(req.query.id, req.body, {
		new: true,
		runValidators: true,
	});
	return cinema;
}

export async function deleteCinema(req) {
	const deletedCinema = await Cinema.deleteOne({ _id: req.query.id });
	return deletedCinema;
}

export async function updateCinemas(req) {
	const { userId, cinemasIds } = req.body;

	const removeManagersFromCinemas = await Cinema.find({});
	removeManagersFromCinemas.forEach((cinema) => {
		cinema.managers.pull(userId);
		cinema.save();
	});

	const cinemas = await Cinema.find({ _id: { $in: cinemasIds } });
	cinemas.forEach((cinema) => {
		cinema.managers.push(userId);
		cinema.save();
	});

	return cinemas;
}

export async function getCinemasByManager(userId) {
	const cinemas = await Cinema.find({ managers: userId });
	return cinemas;
}
