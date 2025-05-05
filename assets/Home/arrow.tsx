import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface ArrowSVGProps extends SvgProps {}

const ArrowSVG: React.FC<ArrowSVGProps> = (props) => (
  <Svg
    width={14}
    height={12}
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1 6L13 6M13 6L8.5 10.5M13 6L8.5 1.5"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ArrowSVG;
