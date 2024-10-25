const express = require("express");
const router = express.Router();
const heroController = require("../../controllers/hero.controller");

// Middleware para checar autenticação
// function isAuthenticated(req, res, next) {
//     if (req.user) {
//         return next();
//     } else {
//         return res.status(401).send({ error: "Unauthorized" });
//     }
// }

// Rota para obter todos os heróis
router.get("/heroes", heroController.getAllHeroes);

// Rota para obter um herói específico por tag
router.get("/heroes/:tag", heroController.getHeroByTag);

module.exports = router;