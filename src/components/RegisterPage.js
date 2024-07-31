// src/components/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, FormErrorMessage, Alert, Select } from '@chakra-ui/react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'simple'  // Valeur par défaut pour le rôle
    });
    const [errors, setErrors] = useState({});
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.email = formData.email ? "" : "L'email est requis.";
        tempErrors.password = formData.password ? "" : "Le mot de passe est requis.";
        tempErrors.role = formData.role ? "" : "Le rôle est requis.";

        // Vérification simple de l'email
        const emailRegex = /\S+@\S+\.\S+/;
        if (formData.email && !emailRegex.test(formData.email)) {
            tempErrors.email = "L'email n'est pas valide.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).every(key => !tempErrors[key]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Vérifier si l'email est déjà utilisé
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.email === formData.email) {
                setRegisterError('Un utilisateur avec cet email existe déjà.');
                return;
            }

            // Stocker les informations de l'utilisateur
            localStorage.setItem('user', JSON.stringify(formData));
            // Redirection vers la page de connexion après inscription réussie
            navigate('/login');
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
            {registerError && <Alert status="error" mb={4}>{registerError}</Alert>}
            <VStack as="form" onSubmit={handleSubmit} spacing={4}>
                <FormControl id="email" isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                </FormControl>
                <FormControl id="password" isInvalid={!!errors.password}>
                    <FormLabel>Mot de Passe</FormLabel>
                    <Input name="password" type="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
                </FormControl>
                <FormControl id="role" isInvalid={!!errors.role}>
                    <FormLabel>Rôle</FormLabel>
                    <Select name="role" value={formData.role} onChange={handleChange}>
                        <option value="simple">Utilisateur Simple</option>
                        <option value="admin">Administrateur</option>
                    </Select>
                    {errors.role && <FormErrorMessage>{errors.role}</FormErrorMessage>}
                </FormControl>
                <Button type="submit" colorScheme="teal" size="lg" width="full">
                    S'inscrire
                </Button>
            </VStack>
        </Box>
    );
};

export default RegisterPage;
