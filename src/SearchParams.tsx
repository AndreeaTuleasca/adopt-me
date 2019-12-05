import React, {
  useState,
  useEffect,
  useContext,
  FunctionComponent
} from "react";
import { connect } from "react-redux";
import Results from "./Results";
import pet, { ANIMALS, Animal } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
// import ThemeContext from "./ThemeContext";
import { RouteComponentProps } from "@reach/router";
import changeTheme from "./actionCreators/changeTheme";
import changeLocation from "./actionCreators/changeLocation";

const SearchParams: FunctionComponent<RouteComponentProps<{
  path: string;
}>> = (props: any) => {
  const [pets, setPets] = useState([] as Animal[]);
  const [availableBreeds, setBreeds] = useState([] as string[]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown(
    "Breed",
    "",
    availableBreeds
  );

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreeds, setBreed]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location: props.location,
      breed,
      type: animal
    });
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
            value={props.location}
            placeholder="Location"
            onChange={e => props.updateLocation(e.target.value)}
            onBlur={e => props.updateLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={props.theme}
            onChange={e => props.updateTheme(e.target.value)}
            onBlur={e => props.updateTheme(e.target.value)}
          >
            <option value="darkblue">Dark Blue</option>
            <option value="peru">Peru</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: props.theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

const mapStateToProps = ({
  theme,
  location
}: {
  theme: any;
  location: any;
}) => ({
  theme,
  location
});

const mapDispatchToProps = (dispatch: any) => ({
  updateTheme: (theme: any) => dispatch(changeTheme(theme)),
  updateLocation: (location: any) => dispatch(changeLocation(location))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchParams);
