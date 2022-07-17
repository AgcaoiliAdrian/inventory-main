import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  useToast,
  Container,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import axios from "axios";

function Login() {
  let navigate = useNavigate();
  const toast = useToast();
  const [data, setData] = useState({
    username: "",
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
      .post("http://localhost/referral_api/api/login.php", data)
      .then(function (response) {
        if (response.data.message === "Success") {
          window.sessionStorage.setItem('username', data.username);
          navigate(`/home`);
          
        } else if (response.data.message === "Invalid details") {
          toast({
            position: "top",
            title: "Invalid details!",
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
        }
        console.log(response.data);
      });
  };

  return (
    <>
    <div className="container">
    <form onSubmit={handleSubmit}>
      <Container
        bg={"#fff"}
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
        padding={5}
        borderRadius={8}
      >
        <FormControl marginBottom={5}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            required
            id="username"
            type="text"
            name="username"
            onChange={handleInput}
          />
          {/* {!isError && (
            <FormErrorMessage>Username is required.</FormErrorMessage>
          )} */}
        </FormControl>

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
          {/* {!isError && (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )} */}
        </FormControl>

        <Button
          // isLoading={isClick ? true : false}
          loadingText="Signing in"
          colorScheme="teal"
          variant="solid"
          width="100%"
          type="submit"    
          name="login"      
        >
          Sign In
        </Button>
      </Container>
      </form>
    </div>
  </>
  );
}

export default Login;
