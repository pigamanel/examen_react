import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Alert, VStack } from '@chakra-ui/react';

const EditContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const foundContact = storedContacts.find(contact => contact.id === parseInt(id));
        if (foundContact) {
            setContact(foundContact);
        } else {
            setError('Contact non trouvé');
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prevContact => ({
            ...prevContact,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const updatedContacts = storedContacts.map(c =>
            c.id === contact.id ? contact : c
        );
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        setSuccess('Contact mis à jour avec succès');
        setTimeout(() => {
            navigate('/list');
        }, 1500); // Temporisation pour permettre à l'utilisateur de lire le message de succès
    };

    return (
        <Box p={4} maxW="md" mx="auto">
            {error && <Alert status="error" mb={4}>{error}</Alert>}
            {success && <Alert status="success" mb={4}>{success}</Alert>}
            {!contact ? (
                <p>Chargement...</p>
            ) : (
                <Box as="form" onSubmit={handleSubmit} borderWidth={1} borderRadius="md" p={4} shadow="md">
                    <VStack spacing={4} align="stretch">
                        <FormControl isRequired>
                            <FormLabel>Nom</FormLabel>
                            <Input name="nom" value={contact.nom} onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Prénom</FormLabel>
                            <Input name="prenom" value={contact.prenom} onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Numéro de Téléphone</FormLabel>
                            <Input name="telephone" value={contact.telephone} onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input name="email" value={contact.email} onChange={handleChange} />
                        </FormControl>
                        <Button type="submit" colorScheme="blue">Mettre à jour</Button>
                    </VStack>
                </Box>
            )}
        </Box>
    );
};

export default EditContact;
