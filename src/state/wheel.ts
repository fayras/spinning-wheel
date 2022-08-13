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

let rotationSpeed = 0;

export const spin = (speed = 3) => {
  rotationSpeed = speed + Math.random() * speed;
};

Ticker.shared.add((dt) => {
  rotationSpeed *= 0.98;
  if (rotationSpeed < 0.001) {
    rotationSpeed = 0;
  }

  state.rotation += rotationSpeed * dt;
});
