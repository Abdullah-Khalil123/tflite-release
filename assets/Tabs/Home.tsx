import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const HomeSVG: React.FC<SvgProps> = (props) => (
  <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
    <Path
      d="M29 25.9298V15.5941C29 14.7612 28.8283 13.9371 28.4954 13.1717C28.1624 12.4064 27.6752 11.716 27.0633 11.1423L17.1436 1.8443C16.5654 1.30224 15.7983 1 15.0008 1C14.2033 1 13.4362 1.30224 12.858 1.8443L2.93667 11.1423C2.32479 11.716 1.83757 12.4064 1.50463 13.1717C1.17169 13.9371 0.999999 14.7612 1 15.5941V25.9298C1 26.7441 1.32778 27.525 1.91122 28.1008C2.49467 28.6765 3.28599 29 4.11111 29H25.8889C26.714 29 27.5053 28.6765 28.0888 28.1008C28.6722 27.525 29 26.7441 29 25.9298Z"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default HomeSVG;
