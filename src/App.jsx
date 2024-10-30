import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterForm from './components/CharacterForm'
import CharacterDetails from './components/CharacterDetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<CharacterList/>} />
                <Route path="/add" element={<CharacterForm/>} />
                <Route path="/edit/:id" element={<CharacterForm/>} />
                <Route path="/details/:id" element={<CharacterDetails/>} />
            </Routes>
        </Router>
    );
}

export default App;
