import { proxy } from "valtio";

type WheelItem = {
  id: number;
  label: string;
  color: number;
};

type State = {
  rotationSpeed: number;
  items: WheelItem[];
};

function createItem(label: string, color?: number): WheelItem {
  const id = new Date().valueOf() + Math.random();

  return { id, label, color: color || Math.floor(Math.random() * 0xffffff) };
}

export const state = proxy<State>({
  rotationSpeed: 0,
  items: ["a", "b", "c"].map((i) => createItem(i)),
});

export const spin = () => {
  state.rotationSpeed = 3;
};

export const addItem = () => {
  state.items.push(createItem("a"));
};

export const removeItem = (id: number) => {
  const index = state.items.findIndex((item) => item.id === id);

  if (index) {
    state.items.splice(index, 1);
  }
};
