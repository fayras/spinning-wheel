import { Flex, Box, Button, useColorModeValue } from "@chakra-ui/react";
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
      <Flex flexDirection={["column", "column", "row"]} justifyContent="center">
        <Box width={["100%", "100%", "500px", "700px"]}>
          <CanvasContainer />
        </Box>
        <Box
          p="10"
          flex="1"
          minWidth={["100%", "100%", "300px"]}
          maxW={"500px"}
        >
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
