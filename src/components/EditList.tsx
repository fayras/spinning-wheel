import { useEffect, useState } from "react";
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
import { state, showEdit, renameList } from "@/state/lists";

export const EditList = () => {
  const list = useSnapshot(state);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(list.currentList.label);
  }, [list.currentList.label, list.showEdit]);

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={list.showEdit}
      onClose={() => {
        setValue("");
        showEdit(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rename current list</ModalHeader>
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
              renameList(list.currentList.id, value);
              setValue("");
              showEdit(false);
            }}
          >
            Rename
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
