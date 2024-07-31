import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';

const ContactDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = React.useState(null);

    React.useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/contacts/${id}`);
                setContact(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du contact', error);
                setContact(null);
            }
        };
        fetchContact();
    }, [id]);

    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });

    if (!contact) {
        return (
            <Box p={4} maxW="md" mx="auto" borderWidth={1} borderRadius="md" shadow="md">
                <Text fontSize="lg" mb={4}>Contact non trouvé</Text>
                <Button as={Link} to="/list" colorScheme="blue">
                    Retour à la liste
                </Button>
            </Box>
        );
    }

    return (
        <Box p={4} maxW="md" mx="auto" borderWidth={1} borderRadius="md" shadow="md">
            <VStack spacing={4} align="start">
                <Text fontSize="lg" fontWeight="bold">Nom:</Text>
                <Text>{contact.nom}</Text>
                <Text fontSize="lg" fontWeight="bold">Prénom:</Text>
                <Text>{contact.prenom}</Text>
                <Text fontSize="lg" fontWeight="bold">Numéro de Téléphone:</Text>
                <Text>{contact.telephone}</Text>
                <Text fontSize="lg" fontWeight="bold">Email:</Text>
                <Text>{contact.email}</Text>
                <Box mt={4}>
                    <Button as={Link} to="/list" colorScheme="blue" size={buttonSize} mr={2}>
                        Retour à la liste
                    </Button>
                </Box>
            </VStack>
        </Box>
    );
};

export default ContactDetails;
