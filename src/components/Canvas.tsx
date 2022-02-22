import { IApplicationOptions } from "pixi.js";
import { Stage } from "react-pixi-fiber/index";
import { Wheel } from "./Wheel";

type Props = {
  width: number;
  height: number;
};

export const Canvas = ({ width, height }: Props) => {
  const OPTIONS: IApplicationOptions = {
    backgroundColor: 0x1099bb,
    backgroundAlpha: 0.3,
    antialias: true,
    height,
    width,
  };

  return (
    <Stage options={OPTIONS}>
      <Wheel x={width / 2} y={height / 2} radius={width / 2} />
    </Stage>
  );
};
