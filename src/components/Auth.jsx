import { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import { signInWithEmail, signUpWithEmail, signOut } from '../integrations/supabase';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState(null);

    const handleAuth = async () => {
        try {
            setError(null);
            if (isSignUp) {
                await signUpWithEmail(email, password);
            } else {
                await signInWithEmail(email, password);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box p={4} borderWidth="1px" borderRadius="md" shadow="md">
            <VStack spacing={4}>
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
                <Button onClick={handleAuth}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
                <Button onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
                </Button>
                <Button onClick={handleSignOut}>Sign Out</Button>
                {error && <Text color="red.500">{error}</Text>}
            </VStack>
        </Box>
    );
};

export default Auth;