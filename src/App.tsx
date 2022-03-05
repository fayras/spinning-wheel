import { Flex, Box, Center, Button, useColorModeValue } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import { showCreate, state } from "@/state/lists";
import { AddItem } from "./components/AddItem";
import { ItemsList } from "./components/ItemsList";
import { ListSelect } from "./components/ListSelect";
import { TopBar } from "./components/TopBar";
import { CreateList } from "./components/CreateList";
import { EditList } from "./components/EditList";
import { CanvasContainer } from "./components/CanvasContainer";

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
          <CanvasContainer />
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
