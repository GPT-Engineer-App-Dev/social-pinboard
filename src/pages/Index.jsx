import { Box, Container, VStack, HStack, Text, Input, Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { usePosts, useAddPost } from "../integrations/supabase";

const Index = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const addPostMutation = useAddPost();
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      addPostMutation.mutate({ name: "Anonymous", body: newPost, likes_count: 0 });
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
          {isLoading ? (
            <Text>Loading posts...</Text>
          ) : isError ? (
            <Text>Error loading posts.</Text>
          ) : posts.length === 0 ? (
            <Text>No posts yet. Be the first to post!</Text>
          ) : (
            posts.map((post) => (
              <Box key={post.id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                <Text>{post.body}</Text>
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
            <Button type="submit" colorScheme="blue" isLoading={addPostMutation.isLoading}>Post</Button>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;