import { Box, useDimensions } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import { state } from "@/state/lists";
import { Confused } from "@/icons/Confused";
import { Waiting } from "@/icons/Wating";
import { useRef } from "react";
import { Canvas } from "./Canvas";
import { SpinButton } from "./SpinButton";

export const CanvasContainer = () => {
  const list = useSnapshot(state);
  const ref = useRef<HTMLDivElement>(null);
  const dims = useDimensions(ref, true);

  if (list.currentItems.length === 0) {
    return (
      <Box
        height="100%"
        width="100%"
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
        height="100%"
        width="100%"
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
    <Box height="100%" width="100%" ref={ref}>
      {dims ? dims.borderBox.width : 10}
      <SpinButton />
      <Canvas
        height={dims ? dims.borderBox.width : 10}
        width={dims ? dims.borderBox.width : 10}
      />
    </Box>
  );
};
