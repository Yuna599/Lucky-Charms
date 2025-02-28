class StatsManager {
    constructor() {
        this.stats = {
            balance: 0,
            chatScore: 0,
            questionsAnswered: 0
        };
    }

    updateAllStats() {
        this.updateStat('balance', '/rpg_answer/getBalance/1');
        this.updateStat('chatScore', '/rpg_answer/getChatScore/1');
        this.updateStat('questionsAnswered', '/rpg_answer/getQuestionsAnswered/1');
    }

    async updateStat(key, url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.stats[key] = data;
            this.updateStatElement(key, data);
        } catch (error) {
            console.error(`Error fetching ${key}:`, error);
            this.stats[key] = 0; // Default to 0 on failure
            this.updateStatElement(key, 0);
        }
    }

    updateStatElement(key, value) {
        const element = document.getElementById(key);
        if (element) {
            element.innerText = value ?? 0;
        } else {
            console.warn(`Element with ID '${key}' not found.`);
        }
    }

    getStats() {
        return this.stats;
    }
}

const statsManager = new StatsManager();
export default statsManager;

function getStats() {
    // Your implementation here
    return {
        health: 100,
        mana: 50,
        experience: 200
    };
}

export { getStats };