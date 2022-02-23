import { IApplicationOptions } from "pixi.js";
import { Stage } from "react-pixi-fiber/index";
import { Arc } from "./Arc";
import { Wheel } from "./Wheel";

type Props = {
  width: number;
  height: number;
};

export const Canvas = ({ width, height }: Props) => {
  const OPTIONS: IApplicationOptions = {
    backgroundAlpha: 0,
    antialias: true,
    height,
    width,
  };

  return (
    <Stage options={OPTIONS}>
      <Wheel x={width / 2} y={height / 2} radius={width / 2 - width * 0.1} />
      <Arc
        x={width / 2}
        y={width * 0.1 + 15}
        radius={30}
        startAngle={-0.4}
        endAngle={0.4}
        color={0xff0000}
      />
    </Stage>
  );
};
