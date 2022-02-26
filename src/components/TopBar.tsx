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
  const { toggleColorMode } = useColorMode();

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
      <Switch p="4" onChange={() => toggleColorMode()} />
    </Flex>
  );
};
