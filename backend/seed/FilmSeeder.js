const loadDevEnv = require("../config/load.dev.env");
const { connectDB } = require("../config/db");
const { Film } = require("../model/entity/Film");

(async () => {
  const { faker } = await import("@faker-js/faker");
  connectDB().then(() => {
    SeedFilms().then(() => {
      console.log("Finished.");
      process.exit(0);
    });
  });

  async function SeedFilms() {
    // 20 adet kategori
    const categories = [
      "Action",
      "Drama",
      "Comedy",
      "Sci-Fi",
      "Horror",
      "Romance",
      "Adventure",
      "Biography",
      "Fantasy",
      "Mystery",
      "Thriller",
      "Animation",
      "Crime",
      "Family",
      "Sport",
      "History",
      "War",
      "Music",
      "Documentary",
      "Western",
    ];

    const films = [];

    for (let i = 1; i <= 100; i++) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const randomDuration = Math.floor(Math.random() * 60) + 90; // 90–150 dakika arası
      const randomPoster = `https://picsum.photos/seed/film_${i}/600/900`;

      films.push({
        title: `Sample Film ${i}`,
        duration: randomDuration,
        category: randomCategory,
        description: faker.commerce.productDescription(),
        posterUrl: randomPoster,
      });
    }

    await Film.insertMany(films);

    console.log("100 films seeded successfully");
  }
})();
