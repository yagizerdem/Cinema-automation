const path = require("path");
const envPath = path.resolve(__dirname, "../", "dev.env");
require("dotenv").config({ path: envPath });

module.exports = {};
