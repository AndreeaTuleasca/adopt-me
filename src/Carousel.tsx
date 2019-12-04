import React from "react";
import { Photo } from "@frontendmasters/pet";

interface Props {
  media: Photo[];
}

interface State {
  photos: string[];
  active: number;
}

class Carousel extends React.Component<Props, State> {
  public state: State = {
    photos: [],
    active: 0
  };

  public static getDerivedStateFromProps({ media }: Props) {
    let photos = ["http://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  public handleIndexClick(event: React.MouseEvent<HTMLElement>) {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index
      });
    }
  }

  public render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal-thimbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
