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
        const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/${id}`);
        setCharacter(response.data);
    };

    if (!character) return <p>Carregando...</p>;

    return (
        <div>
            <h2>Detalhes do Personagem</h2>
            <p><strong>Nome:</strong> {character.nome}</p>
            <p><strong>Classe:</strong> {character.classe}</p>
            <p><strong>Nível:</strong> {character.nivel}</p>
            <p><strong>Experiência:</strong> {character.experiencia}</p>
        </div>
    );
}

export default CharacterDetails;
