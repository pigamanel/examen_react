import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Alert, VStack } from '@chakra-ui/react';
import axios from 'axios';

const EditContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/contacts/${id}`);
                setContact(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du contact', error);
                setError('Contact non trouvé');
            }
        };
        fetchContact();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prevContact => ({
            ...prevContact,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/contacts/${contact.id}`, contact);
            setSuccess('Contact mis à jour avec succès');
            setTimeout(() => {
                navigate('/list');
            }, 1500); // Temporisation pour permettre à l'utilisateur de lire le message de succès
        } catch (error) {
            console.error('Erreur lors de la mise à jour du contact', error);
        }
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
