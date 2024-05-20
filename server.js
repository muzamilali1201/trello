const express = require("express");
const dbConnection = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
require("express-async-errors");
const router = require("./routes/router");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/v1", router);
app.use(errorHandler);

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is running at PORT : ${PORT}`);
});
