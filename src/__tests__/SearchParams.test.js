import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import pet, { ANIMALS, _breeds, _dogs } from "@frontendmasters/pet";

import SearchParams from "../SearchParams";

afterEach(cleanup);

test("SearchParams", async () => {
  const { container, getByTestId, getByText } = render(<SearchParams />);
  const animalDropdown = getByTestId("use-dropdown-animal");
  expect(animalDropdown.children.length).toEqual(ANIMALS.length + 1);

  expect(pet.breeds).toHaveBeenCalled();
  const breedDropdown = getByTestId("use-dropdown-breed");
  expect(breedDropdown.children.length).toEqual(_breeds.length + 1);

  const serarchResults = getByTestId("search-results");
  expect(serarchResults.textContent).toEqual("No Pets Found");
  fireEvent(getByText("Submit"), new MouseEvent("click"));
  expect(pet.animals).toHaveBeenCalled();
  expect(serarchResults.children.length).toEqual(_dogs.length);

  expect(container.firstChild).toMatchInlineSnapshot();
});
