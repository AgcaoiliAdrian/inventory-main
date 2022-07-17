import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Container,
  Grid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import axios from "axios";
import "../App.css";

function Signup() {
  let navigate = useNavigate();
  const toast = useToast();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    extension: "MMS",
    // eslint-disable-next-line no-useless-concat
    username: "MMS-"+"",
    password: "",
  });

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost/referral_api/api/registration.php", data)
      .then(function (response) {
        if (response.data.status === 1) {
          toast({
            title: response.data.message,
            position: "top",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          navigate(`/`);
        } else {
          toast({
            title: response.data.message,
            position: "top",
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <div className="container">
            <form onSubmit={handleSubmit}>
        <Container
          bg={"#fff"}
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
          padding={5}
          borderRadius={8}
        >
          <FormControl marginBottom={5}>
            <FormLabel htmlFor="firstname">First Name</FormLabel>
            <Input
              required
              id="firstname"
              type="text"
              name="firstname"
             onChange={handleInput}
            />
          </FormControl>
    
          <FormControl marginBottom={5}>
            <FormLabel htmlFor="lasttname">Last Name</FormLabel>
            <Input
              required
              id="lastname"
              type="text"
              name="lastname"
              onChange={handleInput} 
            />
          </FormControl>
            
    
            <Grid 
            templateColumns='repeat(5, 1fr)'
            gap={5}
            >
                <FormControl marginBottom={5}>
                <FormLabel htmlFor="username">Extension</FormLabel>
                <Input
                  required
                  disabled
                  id="extension"
                  type="text"
                  name="extension"
                  onChange={handleInput} value={data.extension}
                />
              </FormControl>
    
          <FormControl marginBottom={5}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              required
              width={375}
              id="username"
              type="text"
              name="username"
              onChange={handleInput} value={data.username}
            />
          </FormControl>
          </Grid>
          <FormControl marginBottom={8}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              required
              id="password"
              type="password"
              name="password"
              onChange={handleInput} 
              i
            />
          </FormControl>
    
          <Button
            loadingText="Signing in"
            colorScheme="teal"
            variant="solid"
            width="100%"
            type="submit"
            name="submit"
            value="Register"
          >
            Register
          </Button>
        </Container>
        </form>
      </div>
  );
}

export default Signup;
