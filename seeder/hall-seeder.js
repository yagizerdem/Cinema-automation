const { Hall, Seat } = require("../model/hall");
const { faker } = require("@faker-js/faker");

async function seedHalls() {
  try {
    const halls = [];

    for (let hallIndex = 0; hallIndex < 100; hallIndex++) {
      const hall = new Hall({
        name: `Hall ${hallIndex + 1}`,
        isActive: true,
      });

      const seats = [];

      for (
        let rowCode = "A".charCodeAt(0);
        rowCode <= "H".charCodeAt(0);
        rowCode++
      ) {
        for (let seatNumber = 1; seatNumber <= 12; seatNumber++) {
          seats.push({
            row: String.fromCharCode(rowCode),
            number: seatNumber,
            isActive: true,
          });
        }
      }

      hall.seats = seats;
      halls.push(hall);
    }

    await Hall.insertMany(halls);
    console.log("Halls seeded successfully");
  } catch (err) {
    console.error(err);
  }
}

module.exports = { seedHalls };
