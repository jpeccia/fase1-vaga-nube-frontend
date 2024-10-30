import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    color: #333;
`;

const Title = styled.h2`
    text-align: center;
    color: #333;
`;

const DetailText = styled.p`
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 10px 0;
    strong {
        color: #555;
    }
`;

const LoadingText = styled.p`
    text-align: center;
    color: #666;
    font-size: 1.2rem;
`;

function CharacterDetails() {
    const [character, setCharacter] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchCharacter(id);
    }, [id]);

    const fetchCharacter = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/characters/${id}`);
            setCharacter(response.data);
        } catch (error) {
            console.error('Erro ao buscar personagem:', error);
        }
    };

    if (!character) return <LoadingText>Carregando...</LoadingText>;

    return (
        <Container>
            <Title>Detalhes do Personagem</Title>
            <DetailText><strong>Nome:</strong> {character.name}</DetailText>
            <DetailText><strong>Classe:</strong> {character.characterClass}</DetailText>
            <DetailText><strong>Nível:</strong> {character.level}</DetailText>
            <DetailText><strong>Experiência:</strong> {character.exp}</DetailText>
        </Container>
    );
}

export default CharacterDetails;
