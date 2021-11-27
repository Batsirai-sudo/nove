import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M2 5l5.997 6L14 5"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgArrDown = React.memo(SvgComponent);
export default SvgArrDown;
