import { Box } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import { state } from "@/state/lists";
import { Confused } from "@/icons/Confused";
import { Waiting } from "@/icons/Wating";
import { Canvas } from "./Canvas";
import { SpinButton } from "./SpinButton";

export const CanvasContainer = () => {
  const list = useSnapshot(state);

  if (list.currentItems.length === 0) {
    return (
      <Box
        height={600}
        width={600}
        p="20"
        justifyContent="center"
        textAlign="center"
      >
        <Waiting height="100%" width="100%" opacity={0.6} />
        <Box fontSize="2xl">Add some items to your list!</Box>
      </Box>
    );
  }

  if (list.currentVisibleItems.length === 0) {
    return (
      <Box
        height={600}
        width={600}
        p="20"
        justifyContent="center"
        textAlign="center"
      >
        <Confused height="100%" width="100%" opacity={0.6} />
        <Box fontSize="2xl">
          It seems you have some items but none are visible!
        </Box>
      </Box>
    );
  }

  return (
    <>
      <SpinButton />
      <Canvas height={600} width={600} />
    </>
  );
};
