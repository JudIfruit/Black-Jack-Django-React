import React from 'react';
import PlayerRow from './PlayerRow';

export default function PlayerTable({ players }) {
    const totalScore = players.reduce((total, player) => total + player.score, 0);
    return (
        <div>
            <h2>Players</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {players.map(player => (
                    <PlayerRow key={player.id} player={player}/>
                ))}
                <tr>
                    <td colSpan="2"><strong>Total</strong></td>
                    <td><strong>{totalScore}</strong></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
