const { Hall } = require("../model/hall");

async function createHall(hallData) {
  const newHall = new Hall({ ...hallData });
  await newHall.save();
  return newHall;
}

async function deleteHall(hallId) {
  const deletedHall = await Hall.findByIdAndDelete(hallId);
  return deletedHall;
}

module.exports = {
  createHall,
  deleteHall,
};
