import {
  Button,
  SimpleGrid,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useBoolean,
  Box,
} from "@chakra-ui/react";
import { availableColors } from "@/utils/colors";

type Props = {
  color: string;
  onSelect: (color: string) => void;
};

export const ColorPicker = ({ color, onSelect }: Props) => {
  const [isEditing, setIsEditing] = useBoolean();

  return (
    <Popover
      isOpen={isEditing}
      onOpen={setIsEditing.on}
      onClose={setIsEditing.off}
      placement="left"
      isLazy
      lazyBehavior="keepMounted"
    >
      <PopoverTrigger>
        <Button
          size="xs"
          bgColor={color}
          borderRadius="full"
          _hover={{ bg: color }}
          _active={{ bg: color }}
          mr="2"
        />
      </PopoverTrigger>
      <PopoverContent width="auto">
        <PopoverArrow />
        <PopoverBody height={200} overflowY="scroll">
          <SimpleGrid columns={5} spacing={2} templateColumns="repeat(5, 24px)">
            {availableColors.map((c) => {
              return (
                <Box
                  key={c}
                  bg={c}
                  w="6"
                  h="6"
                  cursor="pointer"
                  onClick={() => onSelect(c)}
                />
              );
            })}
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
