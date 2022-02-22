import { proxy } from "valtio";

type State = {
  isDark: boolean;
};

export const state = proxy<State>({
  isDark: false,
});
