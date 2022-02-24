import {
  Button,
  Flex,
  Box,
  Center,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddItem } from "./components/AddItem";
import { Canvas } from "./components/Canvas";
import { ItemsList } from "./components/ItemsList";
import { spin, addItem } from "./state/wheel";

export const App = () => {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <Flex backgroundColor={bg} minHeight="100vh">
      <Center flexDirection="column">
        <Button
          size="lg"
          width="60"
          borderRadius="3xl"
          bgGradient="linear(to-b, teal.500, green.500)"
          _hover={{
            bgGradient: "linear(to-b, red.500, yellow.500)",
          }}
          onClick={() => spin()}
        >
          SPIN
        </Button>
        <Canvas height={600} width={600} />
      </Center>
      <Box p="10" flex="1" maxW={500}>
        <Box mb="10">
          <Button onClick={() => toggleColorMode()}>toggle dark mode</Button>
        </Box>
        <AddItem onAdd={(value) => addItem(value)} />
        <ItemsList />
      </Box>
    </Flex>
  );
};
