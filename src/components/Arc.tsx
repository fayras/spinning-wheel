/* eslint-disable no-param-reassign */
import {
  CustomPIXIComponent,
  type CustomPIXIComponentBehavior,
} from "react-pixi-fiber/index";
import { Graphics } from "pixi.js";
import { CrossHatchFilter } from "@/utils/filters";

function callback(
  instance: Graphics,
  event: string,
  newValue?: () => void,
  oldValue?: () => void
) {
  if (oldValue) {
    instance.off(event, oldValue);
  }

  if (newValue) {
    instance.on(event, newValue);
  }
}

type Props = {
  x: number;
  y: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  color: number;
  crossHatch: boolean;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
};

export const behavior: CustomPIXIComponentBehavior<Graphics, Props> = {
  customDisplayObject() {
    const g = new Graphics();
    g.interactive = true;

    return g;
  },

  customApplyProps(
    instance: Graphics,
    oldProps: Props | undefined,
    newProps: Props
  ) {
    const { x, y, radius, startAngle, endAngle, color, crossHatch } = newProps;
    instance.clear();
    instance.beginFill(color);
    instance.arc(x, y, radius, startAngle, endAngle);
    instance.lineTo(x, y);
    instance.endFill();

    if (crossHatch) {
      instance.filters = [new CrossHatchFilter()];
    } else {
      instance.filters = [];
    }

    callback(instance, "click", newProps.onClick, oldProps?.onClick);
    callback(
      instance,
      "mouseover",
      newProps.onMouseOver,
      oldProps?.onMouseOver
    );
    callback(
      instance,
      "mouseout",
      newProps.onMouseLeave,
      oldProps?.onMouseLeave
    );
  },
};

export const Arc = CustomPIXIComponent(behavior, "Arc");
