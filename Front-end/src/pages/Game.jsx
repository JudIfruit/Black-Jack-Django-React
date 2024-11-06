import React, { useState } from 'react';
import useCreateGame from '../hooks/useCreateGame';
import './Game.css';
import {Link} from "react-router-dom";

export default function Game() {
    const { createGame } = useCreateGame();
    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState('');
    const [gameData, setGameData] = useState(null);
    const [currentTurn, setCurrentTurn] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [winner, setWinner] = useState(null);

    const handleChangePlayers = (index, value) => {
        const updatedPlayers = [...players];
        updatedPlayers[index] = value;
        setPlayers(updatedPlayers);
    };

    const handleCreateGame = () => {
        createGame({ players: [...players, 'Croupier'] })
            .then(data => {
                setGameData({
                    ...data,
                    scores: Array(players.length + 1).fill(0),
                    turnsPassed: Array(players.length + 1).fill(false)
                });
                dealerPlay();
            })
            .catch(error => console.error(error));
    };

    const addPlayer = () => {
        if (newPlayer && !players.includes(newPlayer)) {
            setPlayers([...players, newPlayer]);
            setNewPlayer('');
        }
    };

    const removePlayer = (index) => {
        const updatedPlayers = [...players];
        updatedPlayers.splice(index, 1);
        setPlayers(updatedPlayers);
    };

    const rollDice = (numDice) => {
        return Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1)
            .reduce((sum, current) => sum + current, 0);
    };

    const handlePlayerRoll = (numDice) => {
        const rollScore = rollDice(numDice);
        const newScore = gameData.scores[currentTurn] + rollScore;

        setGameData((prev) => {
            const updatedScores = [...prev.scores];
            updatedScores[currentTurn] = newScore;
            return { ...prev, scores: updatedScores };
        });

        if (newScore >= 21) {
            passTurn();
        }
    };

    const passTurn = () => {
        setGameData(prev => ({
            ...prev,
            turnsPassed: prev.turnsPassed.map((pass, idx) => (idx === currentTurn ? true : pass))
        }));
        nextTurn();
    };

    const dealerPlay = () => {
        let score = dealerScore;
        while (score < 17) {
            score += rollDice(1 + Math.floor(Math.random() * 3));
        }
        setDealerScore(score);
        nextTurn();
    };

    const nextTurn = () => {
        let nextTurn = currentTurn + 1;

        while (nextTurn < players.length && gameData.turnsPassed[nextTurn]) {
            nextTurn++;
        }

        if (nextTurn >= players.length) {
            determineWinner();
        } else {
            setCurrentTurn(nextTurn);
        }
    };

    const determineWinner = () => {
        const validScores = gameData.scores.filter(score => typeof score === "number" && score <= 21);

        const validDealerScore = dealerScore <= 21 ? dealerScore : null;
        const allScores = [...validScores, validDealerScore];

        const highestScore = Math.max(...allScores);

        const winners = players.filter((player, idx) => gameData.scores[idx] === highestScore);
        if (validDealerScore === highestScore) {
            winners.push("Croupier");
        }

        if (winners.length === 0) {
            setWinner("Aucun gagnant");
        } else {
            setWinner(winners.join(", "));
        }
    };

    return (

        <div>
            <Link to="/">
                Home
            </Link>
            {!gameData && (
                    <div className={'game-container'}>
                        <div className={'left-game'}>
                        <div >
                            <h1>Back Jack</h1>
                            <h2>
                                Joueur(s):
                            </h2>
                        </div>
                    <div>
                        <input className={'addplayer'}
                            type="text"
                            value={newPlayer}
                            onChange={e => setNewPlayer(e.target.value)}
                            placeholder="Ajouter un joueur"
                        />
                        <button className={'create-game'} onClick={addPlayer}>Ajouter</button>
                    </div>



                    <button className={'create-game'} onClick={handleCreateGame}>Créer la Partie</button>


                        </div>

                        <div className={'right-game'}>
                            <h2>Liste des Joueurs:</h2>
                            <ul>
                                {players.map((player, idx) => (
                                    <li key={idx}>
                                        <h1>{player}</h1>
                                        <button className="supprplayer" onClick={() => removePlayer(idx)}>Supprimer
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
            )}

            {gameData && !winner && (
                <div className={'game-container'}>
                    <div className={'left-game'}>
                        <h2>Partie: {gameData.name}</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>Joueur</th>
                                <th>Score</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className={'croupier'}>Croupier</td>
                                <td className={'croupier'}>{dealerScore}</td>
                            </tr>
                            {players.map((player, idx) => (
                                <tr key={idx}>
                                    <td>{player}</td>
                                    <td>{gameData.scores[idx]}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={'right-game'}>
                            <h2>Tour de : {players[currentTurn]}</h2>
                            <div className={'desbutton'}>
                                <button onClick={() => handlePlayerRoll(1)}>Lancer 1 dé</button>
                                <button onClick={() => handlePlayerRoll(2)}>Lancer 2 dés</button>
                                <button onClick={() => handlePlayerRoll(3)}>Lancer 3 dés</button>
                            </div>
                            <div className={'passbutton'}>
                                <button onClick={passTurn}>Passer le tour</button>
                            </div>
                    </div>
                </div>
            )}

            {winner && (
                <div className={'game-container'}>
                    <div className={'left-game'}>
                        <p>Score du Croupier : {dealerScore}</p>
                        <h2>Gagnant(s) :  <h3 className={'winner'}> {winner}</h3></h2>
                    </div>
                    <div className={'right-game-tableau'}>
                        <h2>Résultats finaux :</h2>
                        <ul className={'tableau'}>

                            <table>
                                <thead>
                                <tr>
                                    <th>Joueur</th>
                                    <th>Score</th>
                                </tr>
                                </thead>
                                <tbody>
                                {players.map((player, idx) => (
                                    <tr key={idx}>
                                        <td>{player}</td>
                                        <td>{gameData.scores[idx]}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
