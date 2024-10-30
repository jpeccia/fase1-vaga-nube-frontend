import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CharacterList() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/characters`);
            if (Array.isArray(response.data)) {
                setCharacters(response.data);
            } else {
                console.error('A resposta da API não é um array:', response.data);
                setCharacters([]);
            }
        } catch (error) {
            console.error('Erro ao buscar personagens:', error);
        }
    };

    const deleteChar = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/characters/${id}`);
            fetchCharacters(); // Recarrega a lista após a exclusão
        } catch (error) {
            console.error('Erro ao deletar personagem:', error);
        }
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
                    {characters.length > 0 ? (
                        characters.map((character) => (
                            <tr key={character.id}>
                                <td>{character.name}</td>
                                <td>{character.characterClass}</td>
                                <td>{character.level}</td>
                                <td>
                                    <Link to={`/edit/${character.id}`}>Editar</Link>
                                    <button onClick={() => deleteChar(character.id)}>Deletar</button>
                                    <Link to={`/details/${character.id}`}>Detalhes</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Nenhum personagem encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CharacterList;
