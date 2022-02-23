import { useState, useCallback, useEffect, useMemo } from "react";
import { Container, usePixiTicker } from "react-pixi-fiber/index";
import { sound } from "@pixi/sound";
import { state } from "@/state/wheel";
import { useSnapshot } from "valtio";
import clack from "@assets/clack.ogg";
import { Arc } from "./Arc";

type Props = {
  x: number;
  y: number;
  radius: number;
};

sound.add("clack", clack);

const mod = (m: number, n: number) => ((m % n) + n) % n;

export const Wheel = ({ x, y, radius }: Props) => {
  const [rotation, setRotation] = useState(0.05);
  const mState = useSnapshot(state);

  const items = useMemo(
    () => mState.items.filter((item) => item.visible),
    [mState.items]
  );

  useEffect(() => {
    const angle = (Math.PI * 2) / items.length;
    const index = mod(Math.floor(-rotation / angle), items.length);

    state.activeItem = items[index].id;
  }, [rotation, items]);

  useEffect(() => {
    void sound.play("clack");
  }, [mState.activeItem]);

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
      {items.map((item, index) => {
        const angle = (Math.PI * 2) / items.length;

        return (
          <Arc
            key={item.id}
            x={x}
            y={y}
            radius={radius}
            startAngle={index * angle}
            endAngle={index * angle + angle}
            color={item.color}
            // crossHatch={mState.activeItem === item.id}
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
