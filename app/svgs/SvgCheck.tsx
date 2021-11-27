import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        clipRule="evenodd"
        d="M16 31c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C7.716 1 1 7.716 1 16c0 8.284 6.716 15 15 15z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M10.499 16.008l4.496 4.495L23 12.498"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgCheck = React.memo(SvgComponent);
export default SvgCheck;
