import { Box, Container, VStack, HStack, Text, Input, Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, newPost]);
      setNewPost("");
    }
  };

  return (
    <Container maxW="container.lg" p={4}>
      <Flex as="nav" bg="blue.500" color="white" p={4} mb={4} justifyContent="center">
        <Heading size="lg">Public Post Board</Heading>
      </Flex>
      <VStack spacing={4} align="stretch">
        <Box as="main" flex="1">
          {posts.length === 0 ? (
            <Text>No posts yet. Be the first to post!</Text>
          ) : (
            posts.map((post, index) => (
              <Box key={index} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                <Text>{post}</Text>
              </Box>
            ))
          )}
        </Box>
        <Box as="form" onSubmit={(e) => { e.preventDefault(); handlePostSubmit(); }} mt={4}>
          <HStack>
            <Input
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Write your post here..."
            />
            <Button type="submit" colorScheme="blue">Post</Button>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;