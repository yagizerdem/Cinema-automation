const { seedMovies } = require("../seeder/movie-seeder");
const { seedHalls } = require("../seeder/hall-seeder");
const { seedScreenings } = require("../seeder/screening-seeder");

(async () => {
  require("dotenv").config({
    path: ".env.dev",
  });
  const mongoose = require("mongoose");
  await mongoose.connect(process.env.MONGO_URI);

  await seedScreenings();
  mongoose.disconnect();
})();
