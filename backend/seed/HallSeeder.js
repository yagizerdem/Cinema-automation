const loadDevEnv = require("../config/load.dev.env");
const { connectDB } = require("../config/db");
const { Hall } = require("../model/entity/Hall");

connectDB().then(() => {
  SeedHalls();
});

async function SeedHalls() {
  const halls = [];

  halls.push(
    new Hall({
      name: "Hall 1",
      capacity: 200,
      seats: generateSeats(10, 20),
    })
  );

  // Hall 2 — 20 × 10 → 200 seats
  halls.push(
    new Hall({
      name: "Hall 2",
      capacity: 200,
      seats: generateSeats(10, 20),
    })
  );

  // Hall 3 — 15 rows × 10 columns → 150 seats
  halls.push(
    new Hall({
      name: "Hall 3",
      capacity: 150,
      seats: generateSeats(15, 10),
    })
  );

  // Hall 4 — 12 rows × 15 columns → 180 seats
  halls.push(
    new Hall({
      name: "Hall 4",
      capacity: 180,
      seats: generateSeats(12, 15),
    })
  );

  // Hall 5 — small VIP hall → 6 rows × 3 columns → 18 seats
  halls.push(
    new Hall({
      name: "Hall 5",
      capacity: 180,
      seats: generateSeats(12, 15),
    })
  );

  // Hall 6 — 10 rows × 15 columns → 150 seats
  halls.push(
    new Hall({
      name: "Hall 6",
      capacity: 150,
      seats: generateSeats(10, 15),
    })
  );

  await Hall.insertMany(halls);

  console.log("halls seeded successfully");
}

function generateSeats(rows, cols) {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    const rowLabel = String.fromCharCode(65 + r); // A, B, C...
    const rowSeats = [];
    for (let c = 1; c <= cols; c++) {
      rowSeats.push(`${rowLabel}${c}`);
    }
    seats.push(rowSeats);
  }
  return seats;
}
