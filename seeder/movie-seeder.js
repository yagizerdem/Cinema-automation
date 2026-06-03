const { Movie } = require("../model/movie");
const { faker } = require("@faker-js/faker");

async function seedMovies() {
  try {
    const movies = [];
    for (var i = 0; i < 100; i++) {
      const movie = new Movie({
        title: `The ${faker.word.adjective()} ${faker.word.noun()}`,
        description: faker.lorem
          .paragraph()
          .substring(0, Math.random() * 200 + 100),
        durationMinute: Math.floor(Math.random() * 120 + 60),
        isActive: true,
      });
      movies.push(movie);
    }

    await Movie.insertMany(movies);
    console.log("Movies seeded successfully");
  } catch (err) {
    console.error(err);
    return;
  }
}

module.exports = { seedMovies };
