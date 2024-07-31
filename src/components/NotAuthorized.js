import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// Page pour les accès non autorisés
const NotAuthorized = () => {
    return (
        <Box p={4} maxW="md" mx="auto" borderWidth={1} borderRadius="md" shadow="md">
            <Text fontSize="lg" mb={4}>Vous n'êtes pas autorisé à accéder à cette page.</Text>
            <Button as={Link} to="/" colorScheme="blue">Retour à l'accueil</Button>
        </Box>
    );
};

export default NotAuthorized;
