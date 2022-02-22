import { theme } from "@chakra-ui/react";
import { utils } from "pixi.js";

const colorNames = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
] as const;

export const availableColors = colorNames.reduce((all: string[], curr) => {
  const currentColors = theme.colors[curr];
  const c = (
    Object.keys(currentColors) as unknown as (keyof typeof currentColors)[]
  ).map((key) => theme.colors[curr][key]);
  all.push(...c);
  return all;
}, []);

export const { hex2string, string2hex } = utils;

export const getRandomColor = () => {
  const index = Math.floor(Math.random() * availableColors.length);

  return availableColors[index];
  // return Math.floor(Math.random() * 0xffffff);
};
