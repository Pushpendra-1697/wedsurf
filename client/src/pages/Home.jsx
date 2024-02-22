import React from 'react';
import { Avatar, Box, Button, Center, Flex, Heading, Input, InputGroup, InputRightAddon, Modal, ModalBody, ModalCloseButton, ModalContent, Stack, useDisclosure, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import EventCard from '../components/EventCard';
import { useNavigate } from 'react-router-dom';
import SlideShow from '../components/slideshow/SlideShow';

let isAuth = localStorage.getItem('isAuth');
let avatar = localStorage.getItem('avatar');
let name = localStorage.getItem('name');
const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('name');
    localStorage.removeItem('avatar');
    localStorage.clear();
    navigate('/');
  };

  return (
    <Box
      minH={"100vh"}
      border={'1px solid black'}
      width={{ base: '95%', "2xl": '97%', xl: '96%', lg: '95%', md: '95%', sm: '93%' }}
      m={'auto'}
      p={'20px 0'}
    >
      <Stack spacing={10}>
        <Flex align={'center'} justify={'space-between'}>
          <Heading size={'xl'}>Wedsurf</Heading>
          <Center position={'relative'}>
            <Avatar
              size={'md'}
              src={avatar ?? "profile"}
              onClick={isAuth ? onOpen : null}
              cursor={isAuth ? 'pointer' : 'default'}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalContent w={{ base: '87%', md: '30%', sm: '43%', lg: '25%', xl: '15%', "2xl": '15%' }} position={'absolute'} right={6} top={2}>
                <ModalCloseButton />
                <ModalBody>
                  <Flex align={'center'} justify={'center'} gap={'10px'} flexFlow={'column'}>
                    {name && <Text>{name}</Text>}
                    <Button colorScheme='blue' background={'black'} mr={3} onClick={handleLogout}>
                      Logout
                    </Button>
                  </Flex>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Center>
        </Flex>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <InputGroup p={'0 13px'} w={{ base: '90%', lg: '60%', md: '70%', sm: '80%' }}>
            <Input
              type="text"
              name="phone"
              placeholder="Search events, banquet.."
              bg={'rgba(0,0,0,0.16)'}
              p={1}
            />
            <InputRightAddon children={<SearchIcon color={'white'} boxSize={6} />} bg={'black'} />
          </InputGroup>
        </Box>
        <SlideShow />
        <Box display={'flex'} flexDirection={'column'} gap={{ base: '17px', '2xl': '16px', xl: '17px', lg: '19px', md: '18px', sm: '14px' }}>
          <Heading size={'xl'}>Dive in</Heading>
          <Box display={'grid'} gridTemplateColumns={{ base: 'repeat(1,1fr)', '2xl': 'repeat(3,1fr)', xl: 'repeat(2,1fr)', lg: 'repeat(2,1fr)', md: 'repeat(2,1fr)', sm: 'repeat(2,1fr)' }} gap={{ base: '15px', '2xl': '20px', xl: '22px', lg: '20px', md: '19px', sm: '17px' }}>
            <EventCard eName={'Wedding'} eDescription={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'} />
            <EventCard eName={'Pandit'} eDescription={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'} />
            <EventCard eName={'Singer & Dancer'} eDescription={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'} />
            <EventCard eName={'Events Planner'} eDescription={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'} />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default Home;