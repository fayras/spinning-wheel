import { useState } from "react";
import { Canvas } from "./components/Canvas";

export const App = () => {
  const [count] = useState(0);

  return (
    <div>
      <div>test: {count}</div>
      <Canvas height={100} width={100} />
    </div>
  );
};
