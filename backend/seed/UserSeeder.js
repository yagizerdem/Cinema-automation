const loadDevEnv = require("../config/load.dev.env");
const { connectDB } = require("../config/db");
const { User } = require("../model/entity/User");
const { hashPassword } = require("../utils/hashPassword");
const { userRoles } = require("../enum/userRoles");

connectDB().then(() => {
  //   SeedAdmin();
  //   SeedCustomers();
  // SeedBOX_OFFICE_SUPERVISOR();
  // SeedBOX_OFFICE_CLERK();
  // SeedIT_MANAGER();
  // SeedCINEMA_DEPARTMENT_MANAGER();
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

async function SeedBOX_OFFICE_SUPERVISOR() {
  const supervisors = [];
  const password = "123456aA!";
  const hash = await hashPassword(password);

  for (let i = 1; i <= 5; i++) {
    const supervisor = new User({
      firstName: "Supervisor" + i,
      lastName: "BoxOffice",
      email: "supervisor" + i + "@example.com",
      passwordHash: hash,
      userRole: userRoles.BOX_OFFICE_SUPERVISOR,
      emailVerified: true,
      isActive: true,
    });

    supervisors.push(supervisor);
  }

  await User.insertMany(supervisors);
  console.log("5 box office supervisors created");
}

async function SeedBOX_OFFICE_CLERK() {
  const clerks = [];
  const password = "123456aA!";
  const hash = await hashPassword(password);

  for (let i = 1; i <= 10; i++) {
    const clerk = new User({
      firstName: "Clerk" + i,
      lastName: "BoxOffice",
      email: "clerk" + i + "@example.com",
      passwordHash: hash,
      userRole: userRoles.BOX_OFFICE_CLERK,
      emailVerified: true,
      isActive: true,
    });

    clerks.push(clerk);
  }

  await User.insertMany(clerks);
  console.log("10 box office clerks created");
}

async function SeedIT_MANAGER() {
  const managers = [];
  const password = "123456aA!";
  const hash = await hashPassword(password);

  for (let i = 1; i <= 3; i++) {
    const manager = new User({
      firstName: "ITManager" + i,
      lastName: "Tech",
      email: "itmanager" + i + "@example.com",
      passwordHash: hash,
      userRole: userRoles.IT_MANAGER,
      emailVerified: true,
      isActive: true,
    });

    managers.push(manager);
  }

  await User.insertMany(managers);
  console.log("3 IT managers created");
}

async function SeedCINEMA_DEPARTMENT_MANAGER() {
  const managers = [];
  const password = "123456aA!";
  const hash = await hashPassword(password);

  for (let i = 1; i <= 2; i++) {
    const manager = new User({
      firstName: "CinemaDeptManager" + i,
      lastName: "Staff",
      email: "cinema.manager" + i + "@example.com",
      passwordHash: hash,
      userRole: userRoles.CINEMA_DEPARTMENT_MANAGER,
      emailVerified: true,
      isActive: true,
    });

    managers.push(manager);
  }

  await User.insertMany(managers);
  console.log("2 cinema department managers created");
}
