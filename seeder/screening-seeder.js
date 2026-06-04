const { Screening } = require("../model/screening");
const { Movie } = require("../model/movie");
const { Hall } = require("../model/hall");
const { faker } = require("@faker-js/faker");

async function seedScreenings() {
  try {
    const movies = await Movie.find().select("_id durationMinute");
    const halls = await Hall.find().select("_id");

    if (movies.length === 0) {
      throw new Error("No movies found. Seed movies first.");
    }

    if (halls.length === 0) {
      throw new Error("No halls found. Seed halls first.");
    }

    const screenings = [];

    for (let i = 0; i < 100; i++) {
      const movie = faker.helpers.arrayElement(movies);
      const hall = faker.helpers.arrayElement(halls);

      const startTime = faker.date.soon({ days: 30 });
      const endTime = new Date(
        startTime.getTime() + movie.durationMinute * 60 * 1000,
      );

      const screening = new Screening({
        movie: movie._id,
        hall: hall._id,
        startTime,
        endTime,
        basePrice: faker.number.int({ min: 100, max: 400 }),
        isSpecialSession: faker.datatype.boolean({ probability: 0.2 }),
      });

      screenings.push(screening);
    }

    await Screening.insertMany(screenings);

    console.log("Screenings seeded successfully");
  } catch (err) {
    console.error(err);
  }
}

module.exports = { seedScreenings };
