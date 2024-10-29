import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "dotenv/config";
import axios from 'axios';

function PersonagemList() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}`);
        setCharacters(response.data);
    };

    const deleteChar = async (id) => {
        await axios.delete(`${import.meta.env.REACT_APP_API_URL}/${id}`);
        fetchCharacters();
    };

    return (
        <div>
            <h2>Lista de Personagens</h2>
            <Link to="/add">Adicionar Personagem</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Classe</th>
                        <th>Nível</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {characters.map(character => (
                        <tr key={character.id}>
                            <td>{character.nome}</td>
                            <td>{character.classe}</td>
                            <td>{character.nivel}</td>
                            <td>
                                <Link to={`/edit/${character.id}`}>Editar</Link>
                                <button onClick={() => deleteChar(character.id)}>Deletar</button>
                                <Link to={`/details/${character.id}`}>Detalhes</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PersonagemList;
