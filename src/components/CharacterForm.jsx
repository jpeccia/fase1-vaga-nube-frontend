import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CharacterForm() {
    const [character, setCharacter] = useState({ name: '', characterClass: '', level: 1 });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchCharacter(id);
        }
    }, [id]);

    const fetchCharacter = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/characters/${id}`);
            setCharacter(response.data);
        } catch (error) {
            console.error('Erro ao buscar personagem:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacter((prevCharacter) => ({ ...prevCharacter, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`${import.meta.env.VITE_API_URL}/characters/${id}`, character);
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/characters/`, character);
            }
            navigate('/');
        } catch (error) {
            console.error('Erro ao salvar personagem:', error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Editar Personagem' : 'Adicionar Personagem'}</h2>
            <form onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input
                    type="text"
                    name="name"
                    value={character.name}
                    onChange={handleChange}
                    required
                />

                <label>Classe:</label>
                <input
                    type="text"
                    name="characterClass"
                    value={character.characterClass}
                    onChange={handleChange}
                    required
                />

                <label>Nível:</label>
                <input
                    type="number"
                    name="level"
                    value={character.level}
                    onChange={handleChange}
                    required
                    min="1"
                />

                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default CharacterForm;
