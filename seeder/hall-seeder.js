const { Hall } = require("../model/hall");
const { faker } = require("@faker-js/faker");

async function seedHalls() {
  try {
    const halls = [];
    for (var i = 0; i < 100; i++) {
      const hall = new Hall({
        name: `Hall ${i + 1}`,
        isActive: true,
      });
      halls.push(hall);
    }

    await Hall.insertMany(halls);
    console.log("Halls seeded successfully");
  } catch (err) {
    console.error(err);
    return;
  }
}

module.exports = { seedHalls };
