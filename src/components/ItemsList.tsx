import { useSnapshot } from "valtio";
import {
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

import { hex2string, string2hex } from "@/utils/colors";
import { ColorPicker } from "./ColorPicker";

export const ItemsList = () => {
  const mState = useSnapshot(state);
  const bg = useColorModeValue("white", "gray.900");
  const iconColor = useColorModeValue("blackAlpha", "gray");

  const items = [...mState.items].reverse();

  return (
    <List mt="3" spacing={2}>
      {items.map((item) => {
        const color = hex2string(item.color);

        return (
          <ListItem
            boxShadow="sm"
            backgroundColor={bg}
            my="2"
            p="2"
            borderWidth="0px"
            key={item.id}
            borderRadius="4"
          >
            <Flex>
              <Box>
                <ColorPicker
                  color={color}
                  onSelect={(c) => {
                    const index = state.items.findIndex(
                      (i) => i.id === item.id
                    );

                    // eslint-disable-next-line no-bitwise
                    const cAsNum = string2hex(c);
                    state.items[index].color = cAsNum;
                  }}
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
