import { useSnapshot } from "valtio";
import {
  Button,
  List,
  ListItem,
  IconButton,
  Spacer,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { state, removeItem } from "@/state/wheel";

export const ItemsList = () => {
  const mState = useSnapshot(state);
  const bg = useColorModeValue("white", "gray.900");
  const iconColor = useColorModeValue("blackAlpha", "gray");

  return (
    <List mt="3" spacing={3}>
      {mState.items.map((item) => {
        const color = `#${item.color.toString(16).slice(0, 6)}`;

        return (
          <ListItem
            backgroundColor={bg}
            my="2"
            p="2"
            borderWidth="1px"
            key={item.id}
            borderRadius="4"
          >
            <Flex>
              <Box>
                <Button
                  size="xs"
                  bgColor={color}
                  borderRadius="full"
                  _hover={{ bg: color }}
                  _active={{ bg: color }}
                  mr="2"
                />
              </Box>
              <Box>{item.label}</Box>
              <Spacer />
              <Box>
                <IconButton
                  aria-label="Remove Item"
                  onClick={() => {
                    removeItem(item.id);
                  }}
                  variant="ghost"
                  colorScheme={iconColor}
                  size="xs"
                  icon={<CloseIcon />}
                />
              </Box>
            </Flex>
          </ListItem>
        );
      })}
    </List>
  );
};
