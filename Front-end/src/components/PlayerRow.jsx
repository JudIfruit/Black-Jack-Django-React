import React from 'react';

export default function PlayerRow({ player }) {
    return (
        <tr>
            <td>{player.id}</td>
            <td>{player.name}</td>
            <td>{player.score}</td>
        </tr>
    );
}
