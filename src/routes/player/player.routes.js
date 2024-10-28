const express = require("express");
const router = express.Router();
const Player = require("../../models/player/player.model");
const PlayerParser = require("../../utils/playerParser");

// Middleware para checar autenticação (se necessário)
// function isAuthenticated(req, res, next) {
//     if (req.user) {
//         return next();
//     } else {
//         return res.status(401).send({ error: "Unauthorized" });
//     }
// }

// Rota para obter dados de um jogador
router.get("/player/:tag", async (req, res) => {
    const { tag } = req.params;

    console.log(`Chamando API do Overwatch para ${tag}`);

    try {
        const parser = new PlayerParser(tag);
        const playerData = await parser.parse();
        console.log("Dados do jogador obtidos:", playerData);

        // Salvar ou atualizar os dados do jogador no MongoDB
        const player = await Player.findOneAndUpdate(
            { tag },
            {
                tag,
                ...playerData,
            },
            { new: true, upsert: true }
        );

        res.status(200).json(player);
    } catch (error) {
        console.error("Erro ao obter dados do jogador:", error.message);
        res.status(500).json({ error: "Erro ao obter dados do jogador" });
    }
});

module.exports = router;