import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import { state, createList, setCurrent, showCreate } from "@/state/lists";

export const CreateList = () => {
  const list = useSnapshot(state);
  const [value, setValue] = useState("");

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={list.showCreate}
      onClose={() => {
        setValue("");
        showCreate(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new list</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Here is a sample placeholder"
            size="sm"
          />
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            onClick={() => {
              const id = createList(value);
              setCurrent(id);
              setValue("");
              showCreate(false);
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
