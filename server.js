// src/index.js
const express = require("express");
const connectDB = require("./src/db/ow-db");
const playerRoutes = require("./src/routes/player/player.routes");
const heroesRoutes = require("./src/routes/heroes/hero.routes");

const app = express();
app.use(express.json());
app.use("/api", playerRoutes);
app.use("/api", heroesRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
