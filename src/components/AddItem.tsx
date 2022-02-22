import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  onAdd: (value: string) => void;
};

export const AddItem = ({ onAdd }: Props) => {
  const [internalValue, setInternalValue] = useState("");
  const handleAdd = () => {
    onAdd(internalValue);
    setInternalValue("");
  };

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        color="gray.300"
        fontSize="1.5em"
        top="-1px"
      >
        +
      </InputLeftElement>
      <Input
        pr="4.5rem"
        placeholder="Add Item..."
        border="none"
        _focus={{
          boxShadow: "none",
        }}
        value={internalValue}
        onChange={(event) => setInternalValue(event.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
      />
      <InputRightElement>
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
