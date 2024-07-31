// src/components/HomePage.js
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const HomePage = () => {
    return (
        <Box p={6}>
            <Heading as="h1" size="xl" mb={4}>Bienvenue sur la page d'accueil</Heading>
            <Text fontSize="lg">Ici vous trouverez des informations générales ou tout autre contenu que vous souhaitez afficher sur la page d'accueil.</Text>
        </Box>
    );
};

export default HomePage;
