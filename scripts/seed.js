const { seedMovies } = require("../seeder/movie-seeder");

(async () => {
  require("dotenv").config({
    path: ".env.dev",
  });
  const mongoose = require("mongoose");
  await mongoose.connect(process.env.MONGO_URI);

  await seedMovies();
  mongoose.disconnect();
})();
