import React, { Component, ErrorInfo } from "react";
import { Link, Redirect } from "@reach/router";

interface State {
  hasError: boolean;
  redirect: boolean;
}

class ErrorBoudary extends Component {
  public state: State = {
    hasError: false,
    redirect: false
  };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error boundary caught an error", error, info);
  }

  public componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to go back to the homepage.
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoudary;
