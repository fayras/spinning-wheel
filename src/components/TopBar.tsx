import { Moon } from "@/icons/Moon";
import { Sun } from "@/icons/Sun";
import {
  Switch,
  Flex,
  Box,
  useColorMode,
  Spacer,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

export const TopBar = () => {
  const bg = useColorModeValue("white", "gray.900");
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex
      mb="10"
      alignItems="center"
      height="48px"
      boxShadow="base"
      backgroundColor={bg}
    >
      <Box p="2">
        <Heading size="md">Lucky Wheel</Heading>
      </Box>
      <Spacer />
      <Box p="4">
        <Sun opacity={0.5} />
        <Switch
          isChecked={colorMode === "dark"}
          p="1"
          onChange={() => toggleColorMode()}
        />
        <Moon opacity={0.5} />
      </Box>
    </Flex>
  );
};
