import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
`;

const Title = styled.h2`
    text-align: center;
    color: #333;
`;

const AddButton = styled(Link)`
    display: block;
    width: 160px;
    margin: 20px auto;
    padding: 10px;
    background-color: #007bff;
    color: white;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
    &:hover {
        background-color: #0056b3;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const TableHeader = styled.th`
    padding: 12px;
    background-color: #e9ecef;
    color: #333;
    font-weight: bold;
    border: 1px solid #dee2e6;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const TableData = styled.td`
    padding: 12px;
    text-align: center;
    border: 1px solid #dee2e6;
`;

const ActionLink = styled(Link)`
    margin: 0 5px;
    padding: 6px 10px;
    color: #007bff;
    text-decoration: none;
    border: 1px solid #007bff;
    border-radius: 4px;
    &:hover {
        background-color: #007bff;
        color: white;
    }
`;

const ActionButton = styled.button`
    margin: 0 5px;
    padding: 6px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #c82333;
    }
`;

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
            fetchCharacters();
        } catch (error) {
            console.error('Erro ao deletar personagem:', error);
        }
    };

    return (
        <Container>
            <Title>Lista de Personagens</Title>
            <AddButton to="/add">Adicionar Personagem</AddButton>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Classe</TableHeader>
                        <TableHeader>Nível</TableHeader>
                        <TableHeader>Ações</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {characters.length > 0 ? (
                        characters.map((character) => (
                            <TableRow key={character.id}>
                                <TableData>{character.name}</TableData>
                                <TableData>{character.characterClass}</TableData>
                                <TableData>{character.level}</TableData>
                                <TableData>
                                    <ActionLink to={`/details/${character.id}`}>Detalhes</ActionLink>
                                    <ActionLink to={`/edit/${character.id}`}>Editar</ActionLink>
                                    <ActionButton onClick={() => deleteChar(character.id)}>Deletar</ActionButton>
                                </TableData>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableData colSpan="4">Nenhum personagem encontrado.</TableData>
                        </TableRow>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default CharacterList;
