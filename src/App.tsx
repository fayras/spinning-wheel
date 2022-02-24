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
import { SpinButton } from "./components/SpinButton";

export const App = () => {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <Flex backgroundColor={bg} minHeight="100vh">
      <Center flexDirection="column">
        <SpinButton />
        <Canvas height={600} width={600} />
      </Center>
      <Box p="10" flex="1" maxW={500}>
        <Box mb="10">
          <Button onClick={() => toggleColorMode()}>toggle dark mode</Button>
        </Box>
        <AddItem />
        <ItemsList />
      </Box>
    </Flex>
  );
};
