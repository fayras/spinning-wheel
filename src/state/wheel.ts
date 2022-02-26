import { proxy } from "valtio";

type State = {
  rotationSpeed: number;
  activeItem: number | null;
};

export const state = proxy<State>({
  rotationSpeed: 0,
  activeItem: null,
});

export const spin = (speed = 3) => {
  state.rotationSpeed = speed;
};
