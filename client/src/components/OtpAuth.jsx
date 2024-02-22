import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Text,
    useColorModeValue,
    InputRightElement,
    InputGroup,
    useToast,
    Spinner,
    InputLeftAddon,
    InputRightAddon
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { backend_url } from '../components/BackendURL';

const initialState = {
    phone: '',
    otp: ''
};
const OtpAuth = () => {
    const [formData, setFormData] = useState(initialState);
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const otpError = document.getElementById('otpError');
    const phoneError = document.getElementById('phoneError');
    const navigate = useNavigate();
    const toast = useToast();
    const [rememberMe, setRememberMe] = useState(false);
    const [optState, setOtpState] = useState('');

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    function isValidPhoneNumber(phoneNumber) {
        // Regular expression for validating phone numbers (only digits)
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;
        otpError.textContent = '';
        phoneError.textContent = '';

        // Phone number validation
        if (!isValidPhoneNumber(formData.phone)) {
            isValid = false;
            phoneError.textContent = 'Invalid phone number format.';
        }
        // OTP validation
        if (formData.otp.length < 6) {
            isValid = false;
            otpError.textContent = 'OTP must be at least 6 digits long.';
        }

        if (!isValid) {
            return;
        }

        setLoading(true);
        axios.post(`${backend_url}/verify-otp`, { phoneNumber: `+91${formData.phone}`, otp: +formData.otp })
            .then((res) => {
                if (res.data) {
                    setLoading(false);
                    if (res.data.msg === "OTP verified successfully") {
                        localStorage.setItem('isAuth', true);
                        toast({
                            title: `Login Successful!!😊`,
                            status: "success",
                            isClosable: true,
                        });
                        setFormData(initialState);
                        navigate('/home');
                    } else {
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


    const handleSendOtp = () => {
        if (!formData.phone) {
            toast({
                title: `Please enter your phone number`,
                status: "warning",
                isClosable: true,
            });
            return;
        };
        setOtpState(false);
        axios.post(`${backend_url}/send-otp`, { phoneNumber: `+91${formData.phone}` })
            .then((res) => {
                if (res.data) {
                    setOtpState(true);
                    toast({
                        title: `${res.data.msg}`,
                        status: "success",
                        isClosable: true,
                    });
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setTimeout(() => {
                    setOtpState('')
                }, 600000);
            });
    };


    const { phone, otp } = formData;
    return (
        <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
        >
            <form onSubmit={onSubmit}>
                <Stack spacing={4}>
                    <FormControl id="phone" isRequired>
                        <FormLabel>Phone number</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children='+91' bg={'red.100'} />
                            <Input
                                type="tel"
                                name="phone"
                                value={phone}
                                onChange={handleChange}
                                placeholder="Enter Phone number"
                                required
                            />
                            <InputRightAddon onClick={handleSendOtp} children={optState === false ? 'Sending' : optState === true ? 'Sent' : 'Send'} cursor={'pointer'} />
                        </InputGroup>
                        <span id="phoneError" className="error"></span>
                    </FormControl>

                    <FormControl id="otp" isRequired>
                        <FormLabel>OTP</FormLabel>
                        <InputGroup>
                            <Input
                                type={showOtp ? "text" : "password"}
                                name="otp"
                                value={otp}
                                onChange={handleChange}
                                placeholder="Enter Otp"
                                required
                            />

                            <InputRightElement h={"full"}>
                                <Button
                                    variant={"ghost"}
                                    onClick={() =>
                                        setShowOtp((showOtp) => !showOtp)
                                    }
                                >
                                    {showOtp ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <span id="otpError" className="error"></span>
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
    );
}

export default OtpAuth;