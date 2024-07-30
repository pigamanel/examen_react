import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, HStack, Button, useColorMode, useColorModeValue, Text } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('gray.100', 'gray.900');
    const color = useColorModeValue('gray.900', 'gray.100');
    const navLinkColor = useColorModeValue('gray.600', 'gray.300');
    const activeLinkColor = useColorModeValue('blue.500', 'blue.300');

    return (
        <Box bg={bg} px={4} borderBottomWidth={1} borderBottomColor={useColorModeValue('gray.200', 'gray.700')}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack spacing={8} alignItems={'center'}>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold" color={color}>Gestion Contact</Text>
                    </Box>
                    <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                        <Button as={Link} to="/" variant="link" color={navLinkColor} _hover={{ color: activeLinkColor }}>
                            Accueil
                        </Button>
                        <Button as={Link} to="/list" variant="link" color={navLinkColor} _hover={{ color: activeLinkColor }}>
                            Liste des Contacts
                        </Button>
                        <Button as={Link} to="/add" variant="link" color={navLinkColor} _hover={{ color: activeLinkColor }}>
                            Ajouter un Contact
                        </Button>
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    <Button onClick={toggleColorMode} variant="outline" colorScheme={colorMode === 'light' ? 'blue' : 'teal'}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;
