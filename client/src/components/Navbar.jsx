import React from 'react';
import { Flex, Box, Link, useColorModeValue, Icon, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import { FaPersonMilitaryToPerson } from "react-icons/fa6";
import { MdOutlineCelebration } from "react-icons/md";
import { GiMusicSpell, GiUprising } from "react-icons/gi";
import '../styles/navbar.css';

const BottomNavBar = () => {
  const backgroundColor = useColorModeValue('white', 'gray.800');
  const hoverBgColor = useColorModeValue('red.200', 'red.700');

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-around"
      bg={backgroundColor}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      p={4}
      boxShadow="0 -2px 6px rgba(0, 0, 0, 0.1)"
      zIndex="sticky"
    >
      <Box>
        <Link
          as={RouterLink}
          to="/home"
          px={2}
          py={1}
          _hover={{ color: hoverBgColor }}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          _focus={{ color: 'red' }}
        >
          <Icon className='icon' as={AiOutlineHome} />
          <Text>Home</Text>
        </Link>
      </Box>
      <Box>
        <Link
          as={RouterLink}
          to="#"
          px={2}
          py={1}
          _hover={{ color: hoverBgColor }}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          _focus={{ color: 'red' }}
        >
          <Icon className='icon' as={FaPersonMilitaryToPerson} />
          <Text>Wedding</Text>
        </Link>
      </Box>
      <Box>
        <Link
          as={RouterLink}
          to="#"
          px={2}
          py={1}
          _hover={{ color: hoverBgColor }}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          _focus={{ color: 'red' }}
        >
          <Icon className='icon' as={MdOutlineCelebration} />
          <Text>Booking</Text>
        </Link>
      </Box>
      <Box>
        <Link
          as={RouterLink}
          to="#"
          px={2}
          py={1}
          _hover={{ color: hoverBgColor }}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          _focus={{ color: 'red' }}
        >
          <Icon className='icon' as={GiMusicSpell} />
          <Text>Dancer</Text>
        </Link>
      </Box>
      <Box>
        <Link
          as={RouterLink}
          to="#"
          px={2}
          py={1}
          _hover={{ color: hoverBgColor }}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          _focus={{ color: 'red' }}
        >
          <Icon className='icon' as={GiUprising} />
          <Text>Singer</Text>
        </Link>
      </Box>
    </Flex>
  );
}

export default BottomNavBar;
