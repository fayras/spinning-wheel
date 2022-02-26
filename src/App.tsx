import { Flex, Box, Center, useColorModeValue } from "@chakra-ui/react";
import { AddItem } from "./components/AddItem";
import { Canvas } from "./components/Canvas";
import { ItemsList } from "./components/ItemsList";
import { ListSelect } from "./components/ListSelect";
import { SpinButton } from "./components/SpinButton";
import { TopBar } from "./components/TopBar";

export const App = () => {
  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <Flex backgroundColor={bg} minHeight="100vh" flexDirection="column">
      <TopBar />
      <Flex flexDirection="row">
        <Center flexDirection="column">
          <SpinButton />
          <Canvas height={600} width={600} />
        </Center>
        <Box p="10" flex="1" maxW={500}>
          <ListSelect />
          <AddItem />
          <ItemsList />
        </Box>
      </Flex>
    </Flex>
  );
};
