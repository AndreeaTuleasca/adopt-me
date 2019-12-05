import { readFileSync } from "fs";
import path from "path";
import { act } from "@testing-library/react";
import { JestEnvironment } from "@jest/environment";

const breeds = [
  { name: "Bishon Frise" },
  { name: "Bolognese" },
  { name: "Cotton de Tulear" },
  { name: "Havanese" },
  { name: "Maltese" }
];

const doggos = JSON.parse(
  readFileSync(path.join(__dirname, "res.json")).toString()
);

export const ANIMALS = ["dog", "cat", "bird"];
export const _breeds = breeds;
export const _dogs = doggos.animals;

const mock = {
  breeds: jest.fn(() => {
    return { then: callback => act(() => callback(breeds)) };
  }),
  doggos: jest.fn(() => {
    return { then: callback => act(() => callback(doggos)) };
  })
};

export default mock;
