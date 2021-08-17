import React from "react";
import Svg, { Path, Circle, Ellipse, Rect } from "react-native-svg";

const ChevronRight = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
    </Svg>
  );
};

export default ChevronRight;
