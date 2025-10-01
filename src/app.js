const express = require("express");
const app = express();
const sequelize = require("./config/database");

// console.log(require("./routes/userRoutes"));


app.use(express.json());

// Routes
app.use("/api", require("./routes/userRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

sequelize.sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch(err => console.error(err));

module.exports = app;
