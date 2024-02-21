import React, { useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputRightElement,
    InputGroup,
    useToast,
    Spinner
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { backend_url } from '../components/BackendURL';

const initialState = {
    email: '',
    password: ''
};
const Login = () => {
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const passwordError = document.getElementById('passwordError');
    const emailError = document.getElementById('emailError');
    const navigate = useNavigate();
    const toast = useToast();
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    function isValidEmail(email) {
        // Regular expression for validating email addresses
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;
        passwordError.textContent = '';
        emailError.textContent = '';

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

        try {
            let res = await axios.get(`${backend_url}/users/get`, { headers: { 'Content-Type': 'application/json', email: formData.email } });
            if (res.data.msg === "Blocked" && res.data) {
                toast({
                    title: `You are Blocked for 24 Hours`,
                    status: "info",
                    isClosable: true,
                });
                return;
            };
        } catch (err) {
            console.log(err);
        }

        setLoading(true);
        axios.post(`${backend_url}/users/login`, formData)
            .then((res) => {
                if (res.data) {
                    setLoading(false);
                    if (res.data.msg === "Wrong Password") {
                        toast({
                            title: `${res.data.msg}`,
                            status: "warning",
                            isClosable: true,
                        });
                    } else if (res.data.msg === "Wrong Email ID") {
                        toast({
                            title: `${res.data.msg}`,
                            status: "error",
                            isClosable: true,
                        });
                    } else if (res.data.msg === "Login Successful") {
                        localStorage.setItem('name', res.data.name);
                        localStorage.setItem('token', res.data.token);
                        toast({
                            title: `${res.data.msg}`,
                            status: "success",
                            isClosable: true,
                        });
                        setFormData(initialState);
                        navigate('/home');
                    }
                }
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };


    const { email, password } = formData;
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>Sign in to your account</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <form onSubmit={onSubmit}>
                        <Stack spacing={4}>
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

                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align={"start"}
                                    justify={"space-between"}
                                >
                                    <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>Remember me</Checkbox>
                                </Stack>
                                <Button
                                    size="lg"
                                    type="submit"
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                    isDisabled={!rememberMe}
                                >
                                    {loading ? <Spinner size='md' color='red.500' /> : 'Sign in'}
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={"center"}>
                                    New user?{" "}
                                    <Link to="/signup" style={{ color: "blue" }}>
                                        Sign up
                                    </Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}

export default Login;