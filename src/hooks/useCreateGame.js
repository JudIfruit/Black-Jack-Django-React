export default function useCreateGame() {
    const createGame = ({ players }) => {
        const gameData = {
            name: "Black Jack",
            players: players  // Seuls les noms des joueurs sont envoyés
        };

        console.log("Données envoyées :", gameData);

        return fetch("http://localhost:8000/api/create_game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gameData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    return { createGame };
}
