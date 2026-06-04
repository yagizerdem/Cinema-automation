(async () => {
  require("dotenv").config({
    path: ".env.dev",
  });
  const mongoose = require("mongoose");
  await mongoose.connect(process.env.MONGO_URI);

  await mongoose.connection.db.dropCollection("movies");
  await mongoose.connection.db.dropCollection("halls");
  await mongoose.connection.db.dropCollection("screenings");
  await mongoose.connection.db.dropCollection("tickets");

  mongoose.disconnect();
})();
