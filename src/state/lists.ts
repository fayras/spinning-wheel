import { proxy, subscribe } from "valtio";
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
  showCreate: boolean;
  currentID: ListId | null;
  all: List[];
};

const savedInitialState = JSON.parse(
  localStorage.getItem("lists") || "null"
) as State | null;

const internal = proxy<State>(
  savedInitialState || {
    showCreate: false,
    currentID: null,
    all: [],
  }
);

subscribe(internal, () => {
  localStorage.setItem("lists", JSON.stringify(internal));
});

export const state = derive({
  showCreate: (get) => get(internal).showCreate,
  all: (get) => get(internal).all,
  hasLists: (get) => get(internal).all.length > 0,
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

export const showCreate = (flag: boolean) => {
  internal.showCreate = flag;
};

export const setCurrent = (id: ListId) => {
  internal.currentID = id;
};

export const createList = (label: string): ListId => {
  const id = new Date().valueOf() + Math.random();

  internal.all.push({
    id,
    label,
    items: [],
  });

  return id;
};

export const removeList = (id: ListId) => {
  const index = internal.all.findIndex((list) => list.id === id);

  if (index > -1) {
    internal.all.splice(index, 1);
    internal.currentID = internal.all[0]?.id || null;
  }
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

  if (list && index !== undefined && index > -1) {
    if (values.color !== undefined) list.items[index].color = values.color;
    if (values.label !== undefined) list.items[index].label = values.label;
    if (values.visible !== undefined)
      list.items[index].visible = values.visible;
  }
};

export const removeItem = (id: number) => {
  const list = internal.all.find((l) => internal.currentID === l.id);
  const index = list?.items.findIndex((item) => item.id === id);

  if (list && index !== undefined && index > -1) {
    list.items.splice(index, 1);
  }
};
