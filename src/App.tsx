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
      <Center>
        <Canvas height={600} width={600} />
      </Center>
      <Box p="10" flex="1" maxW={500}>
        <Box mb="10">
          <Button onClick={() => spin()}>spin to win</Button>
          <Button onClick={() => toggleColorMode()}>toggle dark mode</Button>
        </Box>
        <AddItem onAdd={(value) => addItem(value)} />
        <ItemsList />
      </Box>
    </Flex>
  );
};