import { Flex, Box, Center, Button, useColorModeValue } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import { showCreate, state } from "@/state/lists";
import { AddItem } from "./components/AddItem";
import { Canvas } from "./components/Canvas";
import { ItemsList } from "./components/ItemsList";
import { ListSelect } from "./components/ListSelect";
import { SpinButton } from "./components/SpinButton";
import { TopBar } from "./components/TopBar";
import { Waiting } from "./icons/Wating";
import { CreateList } from "./components/CreateList";
import { EditList } from "./components/EditList";

export const App = () => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const lists = useSnapshot(state);

  return (
    <Flex backgroundColor={bg} minHeight="100vh" flexDirection="column">
      <TopBar />
      <CreateList />
      <EditList />
      <Flex flexDirection="row">
        <Center flexDirection="column">
          {lists.currentItems.length > 0 ? (
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
            <Button onClick={() => showCreate(true)}>
              Create your first list by clicking here ✨
            </Button>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
