import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const EventCard = ({ eName, eDescription }) => {
    return (
        <Box color={'whitesmoke'} bgGradient={'linear(to-t, rgba(0,0,0,0.84), rgba(0,0,0,0.16))'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'23px'} flexDirection={'column'} textAlign={'center'} boxShadow="0 0 10px rgba(0, 0, 0, 0.2)" borderRadius={'13px'} minW={'200px'} pt={6} pb={6}>
            <Heading size={'xl'} w={'180px'}>{eName}</Heading>
            <Text w={'180px'}>{eDescription}</Text>
        </Box>
    );
}

export default EventCard;