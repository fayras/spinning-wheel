import { useState } from "react";
import { useSnapshot } from "valtio";
import {
  List,
  ListItem,
  ListItemProps,
  IconButton,
  Spacer,
  Box,
  Flex,
  Fade,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "@chakra-ui/icons";
import { state, removeItem } from "@/state/wheel";

import { hex2string, string2hex } from "@/utils/colors";
import { ColorPicker } from "./ColorPicker";

const MotionListItem = motion<ListItemProps>(ListItem);

export const ItemsList = () => {
  const mState = useSnapshot(state);
  const [hoveredItem, setHovered] = useState<number>();

  const bg = useColorModeValue("white", "gray.900");
  const activeBg = useColorModeValue("gray.100", "gray.700");
  const iconColor = useColorModeValue("blackAlpha", "gray");

  const items = [...mState.items].reverse();

  return (
    <List mt="3" spacing={2}>
      <AnimatePresence initial={false}>
        {items.map((item) => {
          const color = hex2string(item.color);

          return (
            <MotionListItem
              boxShadow="sm"
              // backgroundColor={mState.activeItem === item.id ? activeBg : bg}
              backgroundColor={bg}
              layout
              initial={{ opacity: 0, y: -50, scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              my="2"
              p="2"
              borderWidth="0px"
              key={item.id}
              borderRadius="4"
              // onMouseOver={() => {
              //   setHovered(item.id);
              //   state.activeItem = item.id;
              // }}
              // onMouseLeave={() => {
              //   setHovered(undefined);
              //   state.activeItem = null;
              // }}
            >
              <Flex>
                <Box>
                  <ColorPicker
                    color={color}
                    onSelect={(c) => {
                      const index = state.items.findIndex(
                        (i) => i.id === item.id
                      );

                      const cAsNum = string2hex(c);
                      state.items[index].color = cAsNum;
                    }}
                  />
                </Box>
                <Box>{item.label}</Box>
                <Spacer />
                <Box>
                  {/* <Fade in={hoveredItem === item.id}> */}
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
                  {/* </Fade> */}
                </Box>
              </Flex>
            </MotionListItem>
          );
        })}
      </AnimatePresence>
    </List>
  );
};
