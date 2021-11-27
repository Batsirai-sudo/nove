import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M10.016 11H13l2 4H1l2-4h2.987"
        stroke="#353B48"
        strokeLinecap="round"
      />
      <Path
        clipRule="evenodd"
        d="M8 1C5.515 1 3.5 2.93 3.5 5.31 3.5 9.19 8 13 8 13s4.5-3.81 4.5-7.69C12.5 2.93 10.485 1 8 1z"
        stroke="#353B48"
        strokeLinecap="round"
      />
      <Path
        clipRule="evenodd"
        d="M8 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        stroke="#353B48"
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgLocation = React.memo(SvgComponent);
export default SvgLocation;
