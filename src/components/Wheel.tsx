import { useState, useCallback, useEffect, useMemo } from "react";
import { Container, usePixiTicker } from "react-pixi-fiber/index";
import { sound } from "@pixi/sound";
import { state as stateWheel } from "@/state/wheel";
import { state as stateLists } from "@/state/lists";
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
  const mStateWheel = useSnapshot(stateWheel);
  const mStateLists = useSnapshot(stateLists);

  useEffect(() => {
    const angle = (Math.PI * 2) / mStateLists.currentVisibleItems.length;
    const index = mod(
      Math.floor(-rotation / angle),
      mStateLists.currentVisibleItems.length
    );

    stateWheel.activeItem = mStateLists.currentVisibleItems[index]?.id || null;
  }, [rotation, mStateLists.currentVisibleItems]);

  useEffect(() => {
    void sound.play("clack");
  }, [mStateWheel.activeItem]);

  const animate = useCallback(
    (delta) => {
      stateWheel.rotationSpeed *= 0.98;
      if (mStateWheel.rotationSpeed < 0.001) {
        stateWheel.rotationSpeed = 0;
      }

      setRotation((r) => r + mStateWheel.rotationSpeed * delta);
    },
    [mStateWheel.rotationSpeed]
  );

  usePixiTicker(animate);

  return (
    <Container x={x} y={y} pivot={{ x, y }} rotation={rotation}>
      {mStateLists.currentVisibleItems.map((item, index) => {
        const angle = (Math.PI * 2) / mStateLists.currentVisibleItems.length;

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
            // onMouseOver={() => {
            //   stateWheel.activeItem = item.id;
            // }}
            // onMouseLeave={() => {
            //   stateWheel.activeItem = null;
            // }}
          />
        );
      })}
      {/* <Text text={`count: ${state.items.length}`} x={200} y={200} /> */}
    </Container>
  );
};
