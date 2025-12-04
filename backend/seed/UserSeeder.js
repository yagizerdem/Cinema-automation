const loadDevEnv = require("../config/load.dev.env");
const { connectDB } = require("../config/db");
const { User } = require("../model/entity/User");
const { hashPassword } = require("../utils/hashPassword");
const { userRoles } = require("../enum/userRoles");

connectDB().then(() => {
  //   SeedAdmin();
  //   SeedCustomers();
});

async function SeedAdmin() {
  const password = "123456aA!";
  const hash = await hashPassword(password);

  const adminUser = new User({
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    passwordHash: hash,
    userRole: userRoles.ADMIN,
    emailVerified: true,
    isActive: true,
  });

  await adminUser.save();
  console.log("admin user created");
}

async function SeedCustomers() {
  const clietns = [];
  const password = "123456aA!";
  const hash = await hashPassword(password);

  for (let i = 1; i <= 10; i++) {
    const client = new User({
      firstName: "Client" + i,
      lastName: "User",
      email: "client" + i + "@example.com",
      passwordHash: hash,
      userRole: userRoles.CLIENT,
      emailVerified: true,
      isActive: true,
    });

    clietns.push(client);
  }

  await User.insertMany(clietns);
  console.log("10 client users created");
}
