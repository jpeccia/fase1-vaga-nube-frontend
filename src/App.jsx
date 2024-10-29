import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PersonagemList from './PersonagemList';
import PersonagemForm from './PersonagemForm';
import PersonagemDetails from './PersonagemDetails';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={PersonagemList} />
                <Route path="/add" component={PersonagemForm} />
                <Route path="/edit/:id" component={PersonagemForm} />
                <Route path="/details/:id" component={PersonagemDetails} />
            </Switch>
        </Router>
    );
}

export default App;
