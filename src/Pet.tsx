import React, { FunctionComponent } from "react";
import { Link, RouteComponentProps } from "@reach/router";
import { Photo } from "@frontendmasters/pet";

interface Props {
  name: string;
  animal: string;
  breed: string;
  media: Photo[];
  location: string;
  id: string;
}

const Pet: FunctionComponent<Props> = ({
  name,
  animal,
  breed,
  media,
  location,
  id
}: Props) => {
  let hero = "http://placecorgi.com/300/300";
  if (media.length) {
    hero = media[0].small;
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
