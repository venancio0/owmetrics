const express = require("express");
const router = express.Router();
const overwatch = require("overwatch-api");
const Player = require("../../models/player/player.model");

// Middleware para checar autenticação (se necessário)
// function isAuthenticated(req, res, next) {
//     if (req.user) {
//         return next();
//     } else {
//         return res.status(401).send({ error: "Unauthorized" });
//     }
// }

// Rota para obter dados de um jogador
router.get("/player/:platform/:region/:tag", (req, res) => {
    const { platform, region, tag } = req.params;

    console.log(`Chamando API do Overwatch para ${platform}/${region}/${tag}`);

    overwatch.getProfile(platform, region, tag, async (err, json) => {
        if (err) {
            console.error("Erro ao obter dados do jogador:", err);
            return res.status(500).send(err);
        }

        console.log("Dados do jogador obtidos:", json);

        try {
            // Verificar se os dados estão completos
            if (!json.username || !json.games) {
                console.error("Dados incompletos do jogador:", json);
                return res.status(500).json({ error: "Dados incompletos do jogador" });
            }

            // Salvar ou atualizar os dados do jogador no MongoDB
            const player = await Player.findOneAndUpdate(
                { tag: req.params.tag },
                {
                    tag: req.params.tag,
                    username: json.username,
                    portrait: json.portrait,
                    endorsement: json.endorsement,
                    private: json.private,
                    games: json.games,
                    playtime: json.playtime,
                    competitive: json.competitive,
                },
                { new: true, upsert: true }
            );

            res.status(200).json(player);
        } catch (error) {
            console.error("Erro ao salvar dados do jogador:", error.message);
            res.status(500).json({ error: "Erro ao salvar dados do jogador" });
        }
    });
});

module.exports = router;