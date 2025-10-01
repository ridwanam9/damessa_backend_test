const express = require("express");
const app = express();
const sequelize = require("./config/database");
const logger = require("./middlewares/logger");

app.use(express.json());
app.use(logger);

// Routes

app.get("/health", async (req, res) => {
  try {
    // cek database connection
    await sequelize.authenticate();
    res.json({ 
      status: "ok", 
      db: "connected", 
      uptime: process.uptime() 
    });
  } catch (err) {
    res.status(500).json({ 
      status: "error", 
      db: "disconnected", 
      message: err.message 
    });
  }
});



app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

sequelize.sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch(err => console.error(err));

module.exports = app;
