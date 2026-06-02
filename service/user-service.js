const { User } = require("../model/user");

async function registerUser(userData) {
  const user = new User({
    ...userData,
  });

  await user.save();
  return user;
}

module.exports = {
  registerUser,
};
