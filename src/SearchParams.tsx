import React, {
  useState,
  useEffect,
  useContext,
  FunctionComponent
} from "react";
import Results from "./Results";
import pet, { ANIMALS, Animal, Breeds } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import ThemeContext from "./ThemeContext";
import { RouteComponentProps } from "@reach/router";

const SearchParams: FunctionComponent<RouteComponentProps<{
  path: string;
}>> = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [pets, setPets] = useState([] as Animal[]);
  const [availableBreeds, setBreeds] = useState([] as string[]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown(
    "Breed",
    "",
    availableBreeds
  );
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreeds, setBreed]);

  async function requestPets() {
    const { animals } = await pet.animals({ location, breed, type: animal });
    setPets(animals || []);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
            onBlur={e => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="darkblue">Dark Blue</option>
            <option value="peru">Peru</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
