const loadDevEnv = require("../config/load.dev.env");
const { connectDB } = require("../config/db");
const { Film } = require("../model/entity/Film");
const { Hall } = require("../model/entity/Hall");
const { Session } = require("../model/entity/Session");
const { default: mongoose } = require("mongoose");
const { entityStatus } = require("../enum/entityStatus");
const { insertSession } = require("../service/sessionService");

(async () => {
  try {
    await connectDB();
    for (let i = 0; i < 10; i++) {
      await seedSessions();
    }
  } finally {
    mongoose.connection.close();
  }
})();

async function seedSessions() {
  const getFilm = await getRandomFilm();
  const getHall = await getRandomHall();

  const sessions = [];

  // Start today at 08:00
  let startTime = new Date();
  startTime.setHours(8, 0, 0, 0);

  for (let i = 0; i < 400; i++) {
    // Film duration ±30 min
    const jitterMinutes = Math.floor(Math.random() * 61) - 30;
    const durationMinutes = 120 + jitterMinutes;

    const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);

    // Add session
    sessions.push({ startTime, endTime });

    // Gap between 3–5 hours
    const gapMinutes =
      Math.floor(Math.random() * (5 * 60 - 3 * 60 + 1)) + 3 * 60;

    let nextStart = new Date(endTime.getTime() + gapMinutes * 60 * 1000);

    // If nextStart falls between 00:00–08:00 → move to next day at 08:00
    if (nextStart.getHours() < 8) {
      nextStart.setDate(nextStart.getDate() + 1);
      nextStart.setHours(8, 0, 0, 0);
    }

    startTime = nextStart;
  }

  // Insert into database
  for (const s of sessions) {
    try {
      await insertSession({
        filmId: getFilm()._id,
        hallId: getHall()._id,
        startTime: s.startTime,
        endTime: s.endTime,
        basePrice: Math.floor(Math.random() * 20) + 5,
        isSpecial: Math.random() < 0.3,
      });
    } catch (err) {
      // skip overlapping sessions
    }
  }
}

async function getRandomFilm() {
  const films = await Film.find();

  return () => {
    const randomIndex = Math.floor(Math.random() * films.length);
    return films[randomIndex];
  };
}

async function getRandomHall() {
  const halls = await Hall.find();
  return () => {
    const randomIndex = Math.floor(Math.random() * halls.length);
    return halls[randomIndex];
  };
}
