import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'

function App() {
    const navigate = useNavigate();

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </>
    );
}

export default App;