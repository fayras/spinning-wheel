import { proxy } from "valtio";
import { Ticker } from "pixi.js";

type State = {
  rotation: number;
  activeItem: number | null;
};

export const state = proxy<State>({
  rotation: 0,
  activeItem: null,
});

let spinDuration = 0;
let spinTime = 0;
let spinBackMagnitude = 0;

export const spin = () => {
  spinDuration = 2500 + Math.random() * 500;
  spinBackMagnitude = Math.random() * 0.4;
  spinTime = 0;
};

function curve(
  time: number,
  beginningValue: number,
  finalValue: number,
  duration: number,
  magnitude = 1.70158
): number {
  const t = time / duration - 1;
  const c = finalValue - beginningValue;
  const steepness = 0.1;

  return (
    (c * (t * t * ((magnitude + 1) * t + magnitude) + 1) + beginningValue) **
    steepness
  );
}

Ticker.shared.add((dt) => {
  if (spinTime < spinDuration) {
    const speed = 1 - curve(spinTime, 0, 1, spinDuration, spinBackMagnitude);

    spinTime += dt;
    state.rotation += speed * dt;
  }
});
