import { useState } from "react";
import { Stage } from "react-pixi-fiber/index";

function App() {
  const [count] = useState(0);
  const OPTIONS = {
    backgroundColor: 0x1099bb,
    height: 100,
    width: 100,
  };

  return (
    <div>
      <div>test: {count}</div>
      <Stage options={OPTIONS} />
    </div>
  );
}

export default App;
