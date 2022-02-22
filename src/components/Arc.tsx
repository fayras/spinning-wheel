import { CustomPIXIComponent } from "react-pixi-fiber/index";
import { Graphics } from "pixi.js";

type Props = {
  x: number;
  y: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  color: number;
  onClick?: () => void;
};

export const behavior = {
  customDisplayObject: () => {
    const g = new Graphics();
    g.interactive = true;

    return g;
  },
  customApplyProps(
    instance: Graphics,
    oldProps: Props | undefined,
    newProps: Props
  ) {
    const { x, y, radius, startAngle, endAngle, color } = newProps;
    instance.clear();
    instance.beginFill(color);
    instance.arc(x, y, radius, startAngle, endAngle);
    instance.lineTo(x, y);
    instance.endFill();

    if (oldProps?.onClick) {
      instance.off("click", oldProps.onClick);
    }

    if (newProps.onClick) {
      instance.on("click", newProps.onClick);
    }
  },
};

export const Arc = CustomPIXIComponent(behavior, "Arc");
