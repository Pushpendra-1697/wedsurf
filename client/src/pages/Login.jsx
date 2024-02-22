import { Flex, Heading, Radio, RadioGroup, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import OtpAuth from '../components/OtpAuth';
import TokenAuth from '../components/TokenAuth';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const Login = () => {
    const [radioGroup, setRadioGroup] = useState(2);
    
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Link to={'/signup'}><Heading fontSize={"4xl"} textAlign={"center"}>⬅️</Heading></Link>
                    <Heading fontSize={"4xl"} textAlign={"center"}>Sign in to your account</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
                    </Text>
                </Stack>
                <RadioGroup defaultValue='2'>
                    <Stack spacing={5} direction='row' onChange={(e) => setRadioGroup(e.target.value)}>
                        <Radio colorScheme='red' value='1'>
                            OTPAuth
                        </Radio>
                        <Radio colorScheme='green' value='2'>
                            TokenAuth
                        </Radio>
                    </Stack>
                </RadioGroup>
                {radioGroup == 1 ? <OtpAuth /> : <TokenAuth />}
            </Stack>
        </Flex>
    );
}

export default Login;