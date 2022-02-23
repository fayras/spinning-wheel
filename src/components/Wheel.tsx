import { useState, useCallback, useEffect } from "react";
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

  // Workaround dafür, dass React sonst die Items im Rad nicht aktualisiert.
  useEffect(() => {}, [mState.items]);

  const animate = useCallback(
    (delta) => {
      state.rotationSpeed *= 0.98;
      if (state.rotationSpeed < 0.001) {
        state.rotationSpeed = 0;
      }
      setRotation((r) => r + mState.rotationSpeed * delta);
    },
    [mState.rotationSpeed]
  );

  usePixiTicker(animate);

  return (
    <Container x={x} y={y} pivot={{ x, y }} rotation={rotation}>
      {state.items.map((item, index) => {
        const angle = (Math.PI * 2) / state.items.length;

        return (
          <Arc
            key={item.id}
            x={x}
            y={y}
            radius={radius}
            startAngle={index * angle}
            endAngle={index * angle + angle}
            color={item.color}
            crossHatch={mState.activeItem === item.id}
            onMouseOver={() => {
              state.activeItem = item.id;
            }}
            onMouseLeave={() => {
              state.activeItem = null;
            }}
          />
        );
      })}
      {/* <Text text={`count: ${state.items.length}`} x={200} y={200} /> */}
    </Container>
  );
};
