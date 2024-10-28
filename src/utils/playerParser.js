const axios = require("axios");
const cheerio = require("cheerio");

class PlayerParser {
    constructor(tag) {
        this.tag = tag;
        this.url = `https://overwatch.blizzard.com/career/${tag}`;
    }

    async fetchHTML() {
        const response = await axios.get(this.url);
        return cheerio.load(response.data);
    }

    parseNumber(text) {
        if (typeof text !== 'string') return 0;
        const number = parseInt(text.replace(/,/g, ''), 10);
        return isNaN(number) ? 0 : number;
    }

    parseFloatNumber(text) {
        if (typeof text !== 'string') return 0;
        const number = parseFloat(text.replace(/,/g, ''));
        return isNaN(number) ? 0 : number;
    }

    async parse() {
        const $ = await this.fetchHTML();

        const username = $(".Profile-player--name").text();
        const portrait = $(".Profile-player--portrait").attr("src");
        const title = $(".Profile-player--title").text();
        const endorsement = $(".Profile-playerSummary--endorsement").attr("src");
        const privateProfile = $(".Profile-private---msg").text() === "THIS PROFILE IS CURRENTLY PRIVATE";
        const games = {
            quickplay: {
                won: this.parseInt($(".stats.quickPlay-view p:contains('Games Won')").next().text()),
                played: this.parseNumber($(".stats.quickPlay-view p:contains('Games Played')").next().text()),
            },
            competitive: {
                won: this.parseNumber($(".stats.competitive-view p:contains('Games Won')").next().text()),
                lost: this.parseNumber($(".stats.competitive-view p:contains('Games Lost')").next().text()),
                draw: this.parseNumber($(".stats.competitive-view p:contains('Games Tied')").next().text()),
                played: this.parseNumber($(".stats.competitive-view p:contains('Games Played')").next().text()),
                win_rate: this.parseFloatNumber((this.parseNumber($(".stats.competitive-view p:contains('Games Won')").next().text()) / (this.parseNumber($(".stats.competitive-view p:contains('Games Played')").next().text()) - this.parseNumber($(".stats.competitive-view p:contains('Games Tied')").next().text()))) * 100).toFixed(2),
            },
        };
        const playtime = {
            quickplay: $(".stats.quickPlay-view p:contains('Time Played')").next().text(),
            competitive: $(".stats.competitive-view p:contains('Time Played')").next().text(),
        };
        const competitive = {
            rank: $(".Profile-playerSummary--rankWrapper .Profile-playerSummary--roleWrapper img.Profile-playerSummary--rank").attr("src"),
            rank_img: $(".Profile-playerSummary--rankWrapper .Profile-playerSummary--roleWrapper img.Profile-playerSummary--role").attr("src"),
        };
        const levelFrame = $(".Profile-playerSummary--level").attr("src");
        const star = $(".Profile-playerSummary--star").attr("src");

        return {
            username,
            portrait,
            title,
            endorsement,
            private: privateProfile,
            games,
            playtime,
            competitive,
            levelFrame,
            star,
        };
    }
}

module.exports = PlayerParser;