import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import { state, setCurrent } from "@/state/lists";

export const CreateInitialList = () => {
  const list = useSnapshot(state);

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Button>Create your first list by clicking here ✨</Button>
    </Flex>
  );
};
