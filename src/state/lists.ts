import { proxy } from "valtio";
import { derive } from "valtio/utils";
import { getRandomColor, string2hex } from "@/utils/colors";

type ListId = number;
type ListItemId = number;

type ListItem = {
  id: ListItemId;
  label: string;
  color: number;
  visible: boolean;
};

type List = {
  id: ListId;
  label: string;
  items: ListItem[];
};

type State = {
  currentID: ListId;
  all: List[];
};

const internal = proxy<State>({
  currentID: 123,
  all: [
    { id: 123, label: "Test", items: [] },
    { id: 124, label: "Test 2", items: [] },
  ],
});

export const state = derive({
  all: (get) => get(internal).all,
  currentList: (get): List => {
    const list = get(internal).all.find(
      (l) => get(internal).currentID === l.id
    );

    // Liste sollte nie null sein, aber für Typescript
    return list || { id: 0, label: "", items: [] };
  },
  currentItems: (get) => {
    const list = get(internal).all.find(
      (l) => get(internal).currentID === l.id
    );

    // Liste sollte nie null sein, aber für Typescript
    return list?.items || [];
  },
});

export const setCurrent = (id: ListId) => {
  internal.currentID = id;
};

function createItem(label: string, color?: number): ListItem {
  const id = new Date().valueOf() + Math.random();

  return {
    id,
    label,
    visible: true,
    color: color || string2hex(getRandomColor()),
  };
}

export const addItem = (label: string) => {
  const list = internal.all.find((l) => internal.currentID === l.id);
  list?.items.push(createItem(label));
};

export const editItem = (id: number, values: Partial<Omit<ListItem, "id">>) => {
  const list = internal.all.find((l) => internal.currentID === l.id);
  const index = list?.items.findIndex((item) => item.id === id);

  if (list && index && index > -1) {
    if (values.color !== undefined) list.items[index].color = values.color;
    if (values.label !== undefined) list.items[index].label = values.label;
    if (values.visible !== undefined)
      list.items[index].visible = values.visible;
  }
};

export const removeItem = (id: number) => {
  const list = internal.all.find((l) => internal.currentID === l.id);
  const index = list?.items.findIndex((item) => item.id === id);

  if (list && index && index > -1) {
    list.items.splice(index, 1);
  }
};
