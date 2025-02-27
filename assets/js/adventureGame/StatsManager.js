import { javaURI, fetchOptions } from "../api/config.js";

const personId = 1;

const statsEndpoints = {
    balance: `${javaURI}/rpg_answer/getBalance/${personId}`,
    chatScore: `${javaURI}/rpg_answer/getChatScore/${personId}`,
    questionsAnswered: `${javaURI}/rpg_answer/getQuestionsAnswered/${personId}`
};

// ✅ Exporting `getStats` only once (No import needed)
export function getStats() {
    return {
        strength: 10,
        stamina: 8,
        intelligence: 7
    };
}


/**
 * Fetches and updates all game stats in one call (Balance, Chat Score, Questions Answered).
 */
export function updateAllStats() {
    Object.entries(statsEndpoints).forEach(([key, url]) => {
        fetch(url, fetchOptions)
            .then(response => response.json())
            .then(data => {
                const element = document.getElementById(key);
                if (element) {
                    element.innerText = data ?? 0;
                } else {
                    console.warn(`Element with ID '${key}' not found.`);
                }
            })
            .catch(err => console.error(`Error fetching ${key}:`, err));
    });
}

/**
 * Fetches and updates a specific game stat by key.
 * @param {string} key - The key representing the stat (balance, chatScore, questionsAnswered)
 */
export function updateStat(key) {
    if (!statsEndpoints[key]) {
        console.error(`Invalid stat key: ${key}`);
        return;
    }

    fetch(statsEndpoints[key], fetchOptions)
        .then(response => response.json())
        .then(data => {
            const element = document.getElementById(key);
            if (element) {
                element.innerText = data ?? 0;
            } else {
                console.warn(`Element with ID '${key}' not found.`);
            }
        })
        .catch(err => console.error(`Error fetching ${key}:`, err));
}
