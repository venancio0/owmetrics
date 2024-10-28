const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  portrait: String,
  endorsement: String,
  title: String,
  private: Boolean,
  games: {
    quickplay: {
      won: Number,
      played: Number,
    },
    competitive: {
      won: Number,
      lost: Number,
      draw: Number,
      played: Number,
      win_rate: Number,
    },
  },
  playtime: {
    quickplay: String,
    competitive: String,
  },
  competitive: {
    rank: String,
    rank_img: String,
  },
  levelFrame: String,
  star: String,
});

// Criar índices para os campos necessários
playerSchema.index({ tag: 1 }, { unique: true });

module.exports = mongoose.model("Player", playerSchema);