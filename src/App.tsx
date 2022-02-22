import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { Canvas } from "./components/Canvas";
import { state } from "./state/wheel";

export const App = () => {
  const [count] = useState(0);

  return (
    <div>
      <div>test: {count}</div>
      <Button
        onClick={() => {
          state.rotationSpeed = 2;
        }}
      >
        spin to win
      </Button>
      <Canvas height={100} width={100} />
    </div>
  );
};
