import { useState, useCallback } from "react";
import { Container, usePixiTicker } from "react-pixi-fiber/index";
import { Arc } from "./Arc";

type Props = {
  x: number;
  y: number;
  radius: number;
};

export const Wheel = ({ x, y, radius }: Props) => {
  const [rotation, setRotation] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(3);

  const animate = useCallback(
    (delta) => {
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent tranformation
      setRotation((r) => {
        setRotationSpeed((s) => s * 0.98);
        return r + rotationSpeed * delta;
      });
    },
    [rotationSpeed]
  );

  usePixiTicker(animate);

  return (
    <Container x={x} y={y} pivot={{ x, y }} rotation={rotation}>
      <Arc
        x={x}
        y={y}
        radius={radius}
        startAngle={0}
        endAngle={Math.PI / 2}
        color={0xff0000}
      />
    </Container>
  );
};
