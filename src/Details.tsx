import React, { lazy } from "react";
import { navigate, RouteComponentProps } from "@reach/router";
import { connect } from "react-redux";
import pet, { Photo } from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

const Modal = lazy(() => import("./Modal"));

interface State {
  loading: boolean;
  showModal: boolean;
  name: string;
  animal: string;
  breed: string;
  description: string;
  dogLocation: string;
  media: Photo[];
  url: string;
}

class Details extends React.Component<
  RouteComponentProps<{ id: string; theme: string }>
> {
  state: State = {
    loading: true,
    showModal: false,
    name: "",
    animal: "",
    breed: "",
    description: "",
    dogLocation: "",
    media: [],
    url: ""
  };

  componentDidMount() {
    this.toggleModal.bind(this);
    this.adopt.bind(this);
    if (!this.props.id) {
      navigate("/");
      return;
    }
    pet.animal(+this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        dogLocation: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        url: animal.url,
        loading: false
      });
    }, console.error);
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  adopt = () => {
    navigate(this.state.url);
  };

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }
    const {
      name,
      animal,
      breed,
      description,
      media,
      showModal,
      dogLocation
    } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${dogLocation}`}</h2>
          <button
            onClick={this.toggleModal}
            style={{ backgroundColor: this.props.theme }}
          >
            Adopt {name}
          </button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ theme }: { theme: string }) => ({
  theme
});

const WrappedDetails = connect(mapStateToProps)(Details);

export default function DetailsWithErrorBoundary(
  props: RouteComponentProps<{ id: string; theme: any; dogLocation: any }>
) {
  return (
    <ErrorBoundary>
      <WrappedDetails {...props} />
    </ErrorBoundary>
  );
}
