const { app } = require("./app");
require("dotenv").config({
  path: ".env.dev",
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
