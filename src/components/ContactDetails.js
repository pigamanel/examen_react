import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react';

const ContactDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = React.useState(null);

    React.useEffect(() => {
        const fetchContact = async () => {
            const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
            const contact = storedContacts.find((contact) => contact.id === parseInt(id));
            if (contact) {
                setContact(contact);
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
