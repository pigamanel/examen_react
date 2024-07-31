// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, FormErrorMessage, Alert } from '@chakra-ui/react';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
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

        setErrors(tempErrors);
        return Object.keys(tempErrors).every(key => !tempErrors[key]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Simulez une vérification des informations de connexion
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                if (storedUser.email === formData.email && storedUser.password === formData.password) {
                    // Connexion réussie, redirection en fonction du rôle
                    if (storedUser.role === 'admin') {
                        navigate('/');
                    } else if (storedUser.role === 'simple') {
                        navigate('/list');
                    }
                } else {
                    setLoginError('Échec de la connexion. Veuillez vérifier vos informations.');
                }
            } else {
                setLoginError('Aucun utilisateur trouvé.');
            }
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
            {loginError && <Alert status="error" mb={4}>{loginError}</Alert>}
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
                <Button type="submit" colorScheme="teal" size="lg" width="full">
                    Connexion
                </Button>
            </VStack>
        </Box>
    );
};

export default LoginPage;
