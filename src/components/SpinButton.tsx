import { Button } from "@chakra-ui/react";
import { spin } from "@/state/wheel";

export const SpinButton = () => {
  return (
    <Button
      size="lg"
      width="60"
      borderRadius="3xl"
      bgGradient="linear(to-b, teal.500, green.500)"
      _hover={{
        bgGradient: "linear(to-b, red.500, yellow.500)",
      }}
      onClick={() => spin()}
    >
      SPIN
    </Button>
  );
};
