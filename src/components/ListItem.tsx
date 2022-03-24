import { useMemo, useState } from "react";
import {
  ListItem as ChakraListItem,
  ListItemProps,
  IconButton,
  Spacer,
  Box,
  BoxProps,
  Flex,
  useColorModeValue,
  Input,
  theme,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CloseIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  removeItem,
  editItem,
  type ListItem as ListItemType,
} from "@/state/lists";

import { hex2string, string2hex } from "@/utils/colors";
import { debounce } from "@/utils/helperFns";
import { ColorPicker } from "./ColorPicker";

const MotionListItem = motion<ListItemProps>(ChakraListItem);
const MotionBox = motion<BoxProps>(Box);

export const ListItem = ({ item }: { item: ListItemType }) => {
  const [value, setValue] = useState(item.label);
  const bg = useColorModeValue(theme.colors.white, theme.colors.gray["900"]);
  const iconColor = useColorModeValue("blackAlpha", "gray");
  const color = hex2string(item.color);

  const handleEdit = useMemo(
    () =>
      debounce(
        (id: number, inputValue: string) => editItem(id, { label: inputValue }),
        500
      ),
    []
  );

  const cardVariants = {
    hover: {
      scale: 1.015,
      opacity: 0.7,
    },
    initial: {
      opacity: 0,
      y: -50,
      scale: 1,
    },
  };

  const glowVariants = {
    hover: {
      opacity: 0.8,
    },
    initial: {},
  };

  return (
    <MotionBox initial="initial" whileHover="hover" position="relative">
      <MotionBox
        variants={glowVariants}
        background={`linear-gradient(90deg, ${color} 0%, ${bg} 75%)`}
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        filter="blur(15px)"
        borderRadius="16px"
        opacity={0}
      />
      <MotionListItem
        variants={cardVariants}
        boxShadow="sm"
        backgroundColor={bg}
        layout
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        my="2"
        p="2"
        borderWidth="0px"
        borderRadius="4"
      >
        <Flex>
          <Box>
            <ColorPicker
              color={color}
              onSelect={(c) => {
                const cAsNum = string2hex(c);
                editItem(item.id, { color: cAsNum });
              }}
            />
          </Box>
          <Box flexGrow={10}>
            <Input
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
              variant="unstyled"
              textDecoration={item.visible ? "none" : "line-through"}
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                handleEdit(item.id, event.target.value);
              }}
            />
          </Box>
          <Spacer />
          <Box>
            {/* <Fade in={hoveredItem === item.id}> */}
            <IconButton
              mr="0.5"
              aria-label="Edit Item"
              onClick={() => {
                editItem(item.id, { visible: !item.visible });
              }}
              variant="ghost"
              colorScheme={iconColor}
              size="xs"
              icon={<ViewOffIcon />}
            />
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
    </MotionBox>
  );
};
