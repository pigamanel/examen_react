import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Input,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Select,
    IconButton,
    useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');

    useEffect(() => {
        const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        setContacts(storedContacts);
    }, []);

    const handleDelete = (id) => {
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(updatedContacts);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    };

    const filteredContacts = contacts
        .filter((contact) => {
            return (
                (contact.nom && contact.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (contact.prenom && contact.prenom.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (contact.telephone && contact.telephone.includes(searchTerm))
            );
        })
        .filter((contact) => {
            return filter ? contact.role === filter : true;
        })
        .sort((a, b) => {
            if (!sortCriteria) return 0;
            if (sortCriteria === 'nom') {
                return a.nom.localeCompare(b.nom);
            } else if (sortCriteria === 'prenom') {
                return a.prenom.localeCompare(b.prenom);
            } else if (sortCriteria === 'telephone') {
                return a.telephone.localeCompare(b.telephone);
            }
            return 0;
        });

    return (
        <Box p={6}>
            <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mb={4}
                borderRadius="md"
                boxShadow="sm"
            />
            <Select
                placeholder="Filtrer par rôle"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                mb={4}
                borderRadius="md"
                boxShadow="sm"
            >
                <option value="admin">Admin</option>
                <option value="simple">Simple</option>
            </Select>
            <Select
                placeholder="Trier par"
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
                mb={4}
                borderRadius="md"
                boxShadow="sm"
            >
                <option value="nom">Nom</option>
                <option value="prenom">Prénom</option>
                <option value="telephone">Numéro de Téléphone</option>
            </Select>
            <Table variant="striped" colorScheme="teal" size="md" boxShadow="md" borderRadius="md">
                <Thead bg={useColorModeValue('gray.200', 'gray.700')}>
                    <Tr>
                        <Th>Nom</Th>
                        <Th>Prénom</Th>
                        <Th>Numéro de Téléphone</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredContacts.map((contact) => (
                        <Tr key={contact.id}>
                            <Td>{contact.nom}</Td>
                            <Td>{contact.prenom}</Td>
                            <Td>{contact.telephone}</Td>
                            <Td>
                                <IconButton
                                    as={Link}
                                    to={`/details/${contact.id}`}
                                    icon={<ViewIcon />}
                                    variant="outline"
                                    colorScheme="teal"
                                    aria-label="Voir Détails"
                                    mr={2}
                                />
                                <IconButton
                                    as={Link}
                                    to={`/edit/${contact.id}`}
                                    icon={<EditIcon />}
                                    variant="outline"
                                    colorScheme="yellow"
                                    aria-label="Modifier Contact"
                                    mr={2}
                                />
                                <IconButton
                                    icon={<DeleteIcon />}
                                    variant="outline"
                                    colorScheme="red"
                                    aria-label="Supprimer Contact"
                                    onClick={() => handleDelete(contact.id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default ContactList;
