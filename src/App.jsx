import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CounterButton from "./components/CounterButton.jsx";
import PlayerTable from "./components/PlayerTable.jsx";
import TodoList from "./components/TodoList.jsx";

function App() {
    const [count, setCount] = useState(0);

    const players = [
        { id: 1, name: "Jack", score: 10 },
        { id: 2, name: "Black", score: 20 },
        { id: 3, name: "React", score: 30 },
    ];

    return (
        <div className="app-container">
            {/* Left Column */}
            <div className="left-column">
                <div className="card">
                    <CounterButton />
                </div>
                <div className="player-table-container">
                    <PlayerTable players={players} />
                </div>
            </div>

            {/* Right Column */}
            <div className="right-column">
                <div className="todo-container">
                    <TodoList />
                </div>
            </div>
        </div>
    )
}

export default App;
