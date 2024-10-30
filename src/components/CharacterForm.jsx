import { useState, useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';

function CharacterForm() {
    const [character, setCharacter] = useState({ nome: '', classe: '', nivel: 1 });
    const { id } = useParams();
    const history = useNavigate();

    useEffect(() => {
        if (id) {
            fetchCharacter(id);
        }
    }, [id]);

    const fetchCharacter = async (id) => {
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/${id}`);
        setCharacter(response.data);
    };

    const handleChange = (e) => {
        setCharacter({ ...character, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await axios.put(`${import.meta.env.REACT_APP_API_URL}/${id}`, character);
        } else {
            await axios.post(`${import.meta.env.REACT_APP_API_URL}`, character);
        }
        history.push('/');
    };

    return (
        <div>
            <h2>{id ? 'Editar Personagem' : 'Adicionar Personagem'}</h2>
            <form onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input type="text" name="nome" value={character.nome} onChange={handleChange} required />

                <label>Classe:</label>
                <input type="text" name="classe" value={character.classe} onChange={handleChange} required />

                <label>Nível:</label>
                <input type="number" name="nivel" value={character.nivel} onChange={handleChange} required />

                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default CharacterForm;
