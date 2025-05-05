import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const BackSVG: React.FC<SvgProps> = (props) => (
  <Svg width={22} height={17} viewBox="0 0 22 17" fill="none" {...props}>
    <Path
      d="M21 8.5L1 8.5L21 8.5ZM1 8.5L8.5 0.999999L1 8.5ZM1 8.5L8.5 16L1 8.5Z"
      fill="white"
    />
    <Path
      d="M21 8.5L1 8.5M1 8.5L8.5 0.999999M1 8.5L8.5 16"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default BackSVG;
