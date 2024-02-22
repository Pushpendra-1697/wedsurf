import React, { useEffect } from 'react';
import { Button, Text, Flex, useColorModeValue, Stack, Box, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const Landing = () => {
  const navigate = useNavigate();
  const toast = useToast();

  /*google oAuth login*/
  const handleCallbackResponse = (response) => {
    var userObject = jwt_decode(response.credential);
    if (userObject?.email_verified) {
      localStorage.setItem('isAuth', true);
      localStorage.setItem('name', userObject.name);
      localStorage.setItem('avatar', userObject.picture);
      toast({
        title: `Login Successful ${userObject.name} 😊👍`,
        status: "success",
        isClosable: true,
      });
      navigate('/home');
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "514340861987-f7tbdfd063bbb72d0452dm5je7onj1vj.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={10}>
        <Button
          onClick={() => navigate('/signup')}
          size="lg"
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}>Sign up</Button>

        <Box id="signInDiv"></Box>

        <Button
          size="lg"
          isDisabled
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}>Apple</Button>
        <Text>have an account <Link to={'/login'} style={{ color: "blue" }}>login</Link> in</Text>
      </Stack>
    </Flex>
  );
}

export default Landing;