import { useState, useCallback } from "react";
import { Container, usePixiTicker } from "react-pixi-fiber/index";
import { state } from "@/state/wheel";
import { useSnapshot } from "valtio";
import { Arc } from "./Arc";

type Props = {
  x: number;
  y: number;
  radius: number;
};

export const Wheel = ({ x, y, radius }: Props) => {
  const [rotation, setRotation] = useState(0);
  const mState = useSnapshot(state);

  const animate = useCallback(
    (delta) => {
      state.rotationSpeed *= 0.98;
      setRotation((r) => r + mState.rotationSpeed * delta);
    },
    [mState.rotationSpeed]
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
