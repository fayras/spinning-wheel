import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { addItem } from "../state/lists";

export const AddItem = () => {
  const [internalValue, setInternalValue] = useState("");
  const handleAdd = () => {
    addItem(internalValue);
    setInternalValue("");
  };

  const bg = useColorModeValue("white", "gray.900");
  const iconColor = useColorModeValue("gray.800", "gray.50");

  return (
    <InputGroup zIndex="0">
      <InputLeftElement
        pointerEvents="none"
        color={iconColor}
        fontSize="1.5em"
        top="-1px"
      >
        +
      </InputLeftElement>
      <Input
        pr="4.5rem"
        placeholder="Add Item..."
        border="none"
        backgroundColor={bg}
        boxShadow="sm"
        variant="outline"
        value={internalValue}
        onChange={(event) => setInternalValue(event.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          disabled={internalValue.length === 0}
          onClick={handleAdd}
        >
          Add
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
