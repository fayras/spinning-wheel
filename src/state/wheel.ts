import { proxy } from "valtio";
import { getRandomColor, string2hex } from "@/utils/colors";

type WheelItem = {
  id: number;
  label: string;
  color: number;
  visible: boolean;
};

type State = {
  rotationSpeed: number;
  items: WheelItem[];
  activeItem: number | null;
};

function createItem(label: string, color?: number): WheelItem {
  const id = new Date().valueOf() + Math.random();

  return {
    id,
    label,
    visible: true,
    color: color || string2hex(getRandomColor()),
  };
}

export const state = proxy<State>({
  rotationSpeed: 0,
  items: ["a", "b", "c"].map((i) => createItem(i)),
  activeItem: null,
});

export const spin = () => {
  state.rotationSpeed = 3;
};

export const addItem = (label: string) => {
  state.items.push(createItem(label));
};

export const editItem = (
  id: number,
  values: Partial<Omit<WheelItem, "id">>
) => {
  const index = state.items.findIndex((item) => item.id === id);

  if (index > -1) {
    if (values.color !== undefined) state.items[index].color = values.color;
    if (values.label !== undefined) state.items[index].label = values.label;
    if (values.visible !== undefined)
      state.items[index].visible = values.visible;
  }
};

export const removeItem = (id: number) => {
  const index = state.items.findIndex((item) => item.id === id);

  if (index > -1) {
    state.items.splice(index, 1);
  }
};
