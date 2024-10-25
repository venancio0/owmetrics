const express = require("express");
const mongoose = require("mongoose");
const heroRoutes = require("./src/routes/heroes/hero.routes");
const { healthcheck } = require("./src/controllers/health.controller")

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar ao banco de dados
mongoose.connect("mongodb://localhost:27017/ow-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conectado ao MongoDB"))
.catch((error) => console.error("Erro ao conectar ao MongoDB:", error.message));

app.use(express.json());

// Usar as rotas de heróis
app.use("/api", heroRoutes);
app.use("/api/health", healthcheck);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});