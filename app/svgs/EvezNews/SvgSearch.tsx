import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M17 17l5 5"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        clipRule="evenodd"
        d="M10.5 19a8.5 8.5 0 100-17 8.5 8.5 0 000 17z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgSearch = React.memo(SvgComponent);
export default SvgSearch;
