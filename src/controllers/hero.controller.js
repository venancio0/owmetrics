const Hero = require("../models/heroes/hero.model");

exports.getAllHeroes = async (req, res) => {
  try {
    console.log("Iniciando busca por todos os heróis...");
    const heroes = await Hero.find();
    console.log("Heróis encontrados:", heroes);
    res.status(200).json(heroes);
  } catch (error) {
    console.error("Erro ao buscar heróis:", error.message);
    res.status(500).json({ error: "Erro ao buscar heróis" });
  }
};

exports.getHeroByTag = async (req, res) => {
  try {
    console.log(`Iniciando busca por herói com tag: ${req.params.tag}`);
    const hero = await Hero.findOne({ tag: req.params.tag });
    if (!hero) {
      console.log("Herói não encontrado");
      return res.status(404).json({ error: "Herói não encontrado" });
    }
    console.log("Herói encontrado:", hero);
    res.status(200).json(hero);
  } catch (error) {
    console.error("Erro ao buscar herói:", error.message);
    res.status(500).json({ error: "Erro ao buscar herói" });
  }
};