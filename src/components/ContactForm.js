import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    StackDivider,
    FormErrorMessage
} from '@chakra-ui/react';

const ContactForm = () => {
    const [contact, setContact] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        email: ''
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({
            ...contact,
            [name]: value
        });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.nom = contact.nom ? "" : "Le nom est requis.";
        tempErrors.prenom = contact.prenom ? "" : "Le prénom est requis.";
        tempErrors.telephone = contact.telephone ? "" : "Le numéro de téléphone est requis.";
        tempErrors.email = contact.email ? "" : "L'email est requis.";

        // Vérification simple de l'email
        const emailRegex = /\S+@\S+\.\S+/;
        if (contact.email && !emailRegex.test(contact.email)) {
            tempErrors.email = "L'email n'est pas valide.";
        }

        setErrors(tempErrors);

        // Vérifier qu'il n'y a pas d'erreurs
        return Object.keys(tempErrors).every(key => !tempErrors[key]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
            const newContact = { ...contact, id: Date.now() }; // Ajoutez un identifiant unique à chaque contact
            storedContacts.push(newContact);
            localStorage.setItem('contacts', JSON.stringify(storedContacts));
            navigate('/list');
        }
    };

    return (
        <Box
            maxW="md"
            mx="auto"
            mt={10}
            p={8}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
        >
            <Heading as="h1" size="lg" mb={6} textAlign="center">
                Ajouter un Contact
            </Heading>
            <VStack
                as="form"
                onSubmit={handleSubmit}
                spacing={4}
                divider={<StackDivider borderColor="gray.200" />}
            >
                <FormControl id="nom" isInvalid={!!errors.nom}>
                    <FormLabel>Nom</FormLabel>
                    <Input name="nom" value={contact.nom} onChange={handleChange} />
                    {errors.nom && <FormErrorMessage>{errors.nom}</FormErrorMessage>}
                </FormControl>
                <FormControl id="prenom" isInvalid={!!errors.prenom}>
                    <FormLabel>Prénom</FormLabel>
                    <Input name="prenom" value={contact.prenom} onChange={handleChange} />
                    {errors.prenom && <FormErrorMessage>{errors.prenom}</FormErrorMessage>}
                </FormControl>
                <FormControl id="telephone" isInvalid={!!errors.telephone}>
                    <FormLabel>Numéro de Téléphone</FormLabel>
                    <Input name="telephone" value={contact.telephone} onChange={handleChange} />
                    {errors.telephone && <FormErrorMessage>{errors.telephone}</FormErrorMessage>}
                </FormControl>
                <FormControl id="email" isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" value={contact.email} onChange={handleChange} />
                    {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                </FormControl>
                <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    width="full"
                >
                    Enregistrer
                </Button>
            </VStack>
        </Box>
    );
};

export default ContactForm;
