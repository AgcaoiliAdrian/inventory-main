import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  Box,
  Center,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const Home = () => {
  const [auth, setAuth]=useState('');
  let navigate = useNavigate();
  useEffect(()=>{
    var auth = sessionStorage.getItem('username');
    
    if(auth === null){
      navigate(`/`);
    }
    setAuth(auth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Logout = ()=>{
    sessionStorage.removeItem('username');
    sessionStorage.clear();
    navigate(`/`);
  }

  return (
    <Center py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>  

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {auth}
            </Heading>
          </Stack>
          <Button
            onClick={Logout}
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              background: 'teal',
              boxShadow: 'lg',
            }}>
            Logout
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

export default Home;
