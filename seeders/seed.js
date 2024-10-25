// seed.js
const mongoose = require("mongoose");
const Hero = require("../src/models/heroes/hero.model");
const heroList = require("../src/models/heroes/heroes.json")
require("dotenv").config();

const populateDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await Hero.deleteMany({});  // Limpa a coleção antes de popular
        await Hero.insertMany(heroList);  // Insere os dados iniciais

        console.log("Database populated with heroes!");
    } catch (error) {
        console.error("Error populating database:", error);
    } finally {
        mongoose.connection.close();  // Fecha a conexão
    }
};

populateDatabase();
