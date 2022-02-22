import { Button } from "@chakra-ui/react";
import { Canvas } from "./components/Canvas";
import { spin, addItem } from "./state/wheel";

export const App = () => {
  return (
    <div>
      <Button onClick={() => spin()}>spin to win</Button>
      <Button onClick={() => addItem()}>add</Button>
      <Canvas height={600} width={600} />
    </div>
  );
};
