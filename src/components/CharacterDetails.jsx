import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CharacterDetails() {
    const [character, setCharacter] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchCharacter(id);
    }, [id]);

    const fetchCharacter = async (id) => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/characters/${id}`);
        setCharacter(response.data);
    };

    if (!character) return <p>Carregando...</p>;

    return (
        <div>
            <h2>Detalhes do Personagem</h2>
            <p><strong>Nome:</strong> {character.name}</p>
            <p><strong>Classe:</strong> {character.characterClass}</p>
            <p><strong>Nível:</strong> {character.level}</p>
            <p><strong>Experiência:</strong> {character.exp}</p>
        </div>
    );
}

export default CharacterDetails;
