import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 500px;
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-top: 10px;
    color: #555;
`;

const Input = styled.input`
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
`;

const SubmitButton = styled.button`
    margin-top: 20px;
    padding: 10px;
    background-color: #28a745;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #218838;
    }
`;

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
        <Container>
            <Title>{id ? 'Editar Personagem' : 'Adicionar Personagem'}</Title>
            <Form onSubmit={handleSubmit}>
                <Label>Nome:</Label>
                <Input
                    type="text"
                    name="name"
                    value={character.name}
                    onChange={handleChange}
                    required
                />

                <Label>Classe:</Label>
                <Input
                    type="text"
                    name="characterClass"
                    value={character.characterClass}
                    onChange={handleChange}
                    required
                />

                <Label>Nível:</Label>
                <Input
                    type="number"
                    name="level"
                    value={character.level}
                    onChange={handleChange}
                    required
                    min="1"
                />

                <SubmitButton type="submit">Salvar</SubmitButton>
            </Form>
        </Container>
    );
}

export default CharacterForm;
