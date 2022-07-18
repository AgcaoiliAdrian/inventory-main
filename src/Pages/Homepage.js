import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Container,
  Text,
  useToast,
  Heading,
  Box,
  Center,
  Stack,
  Button,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";

const Homepage = () => {
  const [alerts, setAlerts] = useState(false);
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
    <>
      <div className="comp-container">
        <Flex className="card" justifyContent={'left'}>
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
        </Flex>
        <Container
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
          bg="#fff"
          padding={5}
          borderRadius={8}
          maxW="container.lg"
          w="full"
          h="full"
          overflowY={"scroll"}
        >
          <Tabs isFitted variant="enclosed-colored">
            <TabList mb="1em">
              <Tab borderRadius={5} _hover={{ background: "#e6eaec" }}>
                <Text fontSize="xl">IN</Text>
              </Tab>
              <Tab borderRadius={5} _hover={{ background: "#e6eaec" }}>
                <Text fontSize="xl">OUT</Text>
              </Tab>
              <Tab borderRadius={5} _hover={{ background: "#e6eaec" }}>
                <Text fontSize="xl">CREATE ITEM</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
              </TabPanel>
              <TabPanel>
              </TabPanel>
              <TabPanel>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </div>
    </>
  );
};

export default Homepage;
