import { Flex, Box, Center, useColorModeValue } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import { state } from "@/state/lists";
import { AddItem } from "./components/AddItem";
import { Canvas } from "./components/Canvas";
import { ItemsList } from "./components/ItemsList";
import { ListSelect } from "./components/ListSelect";
import { SpinButton } from "./components/SpinButton";
import { TopBar } from "./components/TopBar";
import { CreateInitialList } from "./components/CreateInitialList";
import { Waiting } from "./icons/Wating";

export const App = () => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const lists = useSnapshot(state);

  return (
    <Flex backgroundColor={bg} minHeight="100vh" flexDirection="column">
      <TopBar />
      <Flex flexDirection="row">
        <Center flexDirection="column">
          {lists.hasLists ? (
            <>
              <SpinButton />
              <Canvas height={600} width={600} />
            </>
          ) : (
            <Box
              height={600}
              width={600}
              p="20"
              justifyContent="center"
              textAlign="center"
            >
              <Waiting height="100%" width="100%" opacity={0.6} />
              <Box fontSize="2xl">Add some items to your list!</Box>
            </Box>
          )}
        </Center>
        <Box p="10" flex="1" maxW={500}>
          {lists.hasLists ? (
            <>
              <ListSelect />
              <AddItem />
              <ItemsList />
            </>
          ) : (
            <CreateInitialList />
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
