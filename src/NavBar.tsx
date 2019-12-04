import React, { useState, FunctionComponent } from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";
import Colors from "./colors";

const spin = keyframes`
to {
    transform: rotate(360deg);
}`;
const NavBar: FunctionComponent = () => {
  const [padding, setPadding] = useState(15);
  return (
    <header
      css={css`
        background-color: ${Colors.primary};
        padding: ${padding}px;
      `}
    >
      <Link to="/">Adopt me!</Link>
      <span
        role="img"
        aria-label="logo"
        css={css`
          font-size: 60px;
          display: inline-block;
          animation: 1s ${spin} linear infinite;
          &:hover {
            animation: 1s ${spin} linear infinite reverse;
          }
        `}
      >
        🌍
      </span>
    </header>
  );
};

export default NavBar;
