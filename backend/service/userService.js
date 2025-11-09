const { User } = require("../model/entity/User");
const { hashPassword } = require("../utils/hashPassword");
const { EnsureEmailNotExist } = require("../business/userRelatedLogic");
const { userRoles } = require("../enum/userRoles");

async function insertClient({ firstName, lastName, email, password }) {
  await EnsureEmailNotExist(email);

  const user = new User({
    firstName,
    lastName,
    email,
    isActive: true,
    emailVerified: false,
    userRole: userRoles.CLIENT,
  });

  const hashedPassword = await hashPassword(password);
  user.passwordHash = hashedPassword;

  await User.insertOne(user);
}

module.exports = { insertClient };
