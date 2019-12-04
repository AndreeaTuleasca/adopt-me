import React, { FunctionComponent } from "react";
import Pet from "./Pet";
import { Animal } from "@frontendmasters/pet";

interface Props {
  pets: Animal[];
}

const Results: FunctionComponent<Props> = ({ pets }) => {
  return (
    <div className="search">
      {pets.length === 0 ? (
        <h1>No pets found!</h1>
      ) : (
        pets.map(pet => (
          <Pet
            name={pet.name}
            animal={pet.type}
            key={pet.id}
            breed={pet.breeds.primary}
            media={pet.photos}
            location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
            id={pet.id.toString()}
          />
        ))
      )}
    </div>
  );
};
export default Results;
