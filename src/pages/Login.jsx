import { useState } from "react";
import { Box, Container, VStack, Input, Button, Text, Heading } from "@chakra-ui/react";
import { supabase } from "../integrations/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/";
    }
    setLoading(false);
  };

  return (
    <Container maxW="container.sm" p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">Login</Heading>
        {error && <Text color="red.500">{error}</Text>}
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          colorScheme="blue"
          onClick={handleLogin}
          isLoading={loading}
        >
          Login
        </Button>
      </VStack>
    </Container>
  );
};

export default Login;