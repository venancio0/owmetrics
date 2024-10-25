// src/index.js
const express = require("express");
const connectDB = require("./src/db/ow-db");
const playerRoutes = require("./src/routes/player/player.routes");
const heroesRoutes = require("./src/routes/heroes/hero.routes");
const health = require("./src/routes/health");

const app = express();
app.use(express.json());
app.use("/api/players", playerRoutes);
app.use("/api/heroes", heroesRoutes);
app.use("/api", health);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
