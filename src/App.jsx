import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterForm from './components/CharacterForm'
import CharacterDetails from './components/CharacterDetails';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={CharacterList} />
                <Route path="/add" component={CharacterForm} />
                <Route path="/edit/:id" component={CharacterForm} />
                <Route path="/details/:id" component={CharacterDetails} />
            </Switch>
        </Router>
    );
}

export default App;
