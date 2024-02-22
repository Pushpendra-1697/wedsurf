import React, { useEffect, useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Spinner,
    useToast,
    InputLeftAddon
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from 'axios';
import { backend_url } from '../components/BackendURL';

const initialState = {
    email: '',
    password: '',
    phone: '',
    name: '',
    location: ''
};
const Signup = () => {
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const passwordError = document.getElementById('passwordError');
    const phoneNumberError = document.getElementById('phoneNumberError');
    const emailError = document.getElementById('emailError');
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                if (result.state === 'granted') {
                    getLocation();
                }
            });
        }
    }, []);

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchLocation(latitude, longitude);
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    };

    const fetchLocation = (latitude, longitude) => {
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
                const city = data.city;
                const region = data.principalSubdivision;
                const country = data.countryName;
                setFormData({ ...formData, location: `${city}, ${region}, ${country}` });
            })
            .catch(error => {
                console.error('Error fetching location:', error);
            });
    };


    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function isValidEmail(email) {
        // Regular expression for validating email addresses
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhoneNumber(phoneNumber) {
        // Regular expression for validating phone numbers (only digits)
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        passwordError.textContent = '';
        emailError.textContent = '';
        phoneNumberError.textContent = '';

        // Phone number validation
        if (!isValidPhoneNumber(formData.phone)) {
            isValid = false;
            phoneNumberError.textContent = 'Invalid phone number format.';
        }
        // Email validation
        if (!isValidEmail(formData.email)) {
            isValid = false;
            emailError.textContent = 'Invalid email format.';
        }
        // Password validation
        if (formData.password.length < 8 || !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password)) {
            isValid = false;
            passwordError.textContent = 'Password must be at least 8 characters long with special character.';
        }

        if (!isValid) {
            return;
        }
        setLoading(true);
        axios.post(`${backend_url}/users/register`, formData)
            .then((res) => {
                if (res.data) {
                    setLoading(false);
                    if (res.data.msg === "Registered Successfully") {
                        toast({
                            title: `${res.data.msg}`,
                            status: "success",
                            isClosable: true,
                        });
                        setFormData(initialState);
                        navigate('/login');
                    } else if (res.data.msg === "Registation failed") {
                        toast({
                            title: `${res.data.msg}`,
                            status: "error",
                            isClosable: true,
                        });
                    }
                }
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    const { name, email, password, phone } = formData;
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Link to={'/'}><Heading fontSize={"4xl"} textAlign={"center"}>⬅️</Heading></Link>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up to your account
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={10}
                >
                    <form onSubmit={onSubmit}>
                        <Stack spacing={4}>
                            <FormControl id="username" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    placeholder="Enter Username"
                                    required
                                />
                            </FormControl>

                            <FormControl id="phone" isRequired>
                                <FormLabel>Phone number</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children='+91' bg={'red.100'} />
                                    <Input
                                        type="number"
                                        name="phone"
                                        value={phone}
                                        onChange={handleChange}
                                        placeholder="Enter Phone number"
                                        required
                                    />
                                </InputGroup>
                                <span id="phoneNumberError" className="error"></span>
                            </FormControl>

                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    placeholder="Enter Email"
                                    required
                                />
                                <span id="emailError" className="error"></span>
                            </FormControl>

                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        placeholder="Enter Password"
                                        required
                                    />

                                    <InputRightElement h={"full"}>
                                        <Button
                                            variant={"ghost"}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }
                                        >
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <span id="passwordError" className="error"></span>
                            </FormControl>

                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    type="submit"
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    {loading ? <Spinner size='md' color='red.500' /> : 'Sign up'}
                                </Button>
                            </Stack>

                            <Stack pt={6}>
                                <Text align={"center"}>
                                    Already a user?{" "}
                                    <Link to="/login" style={{ color: "blue" }}>
                                        Login
                                    </Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Signup