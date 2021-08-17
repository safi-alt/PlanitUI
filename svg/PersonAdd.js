import React from "react";
import Svg, { Path, Circle, Ellipse, Rect } from "react-native-svg";

const PersonAdd = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height="100%"
      viewBox="0 0 24 24"
      width="100%"
    >
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z" />
    </Svg>
  );
};

export default PersonAdd;
