import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={8} height={8} viewBox="0 0 8 8" fill="none">
      <Path
        opacity={0.9}
        d="M4 1C2.346 1 1 2.343 1 4c0 1.654 1.343 3 3 3 1.654 0 3-1.343 3-3 0-1.654-1.343-3-3-3z"
        fill="#fff"
        stroke="#353B48"
        strokeWidth={2}
      />
    </Svg>
  );
}

const SvgPin = React.memo(SvgComponent);
export default SvgPin;
