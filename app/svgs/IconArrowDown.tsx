import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M1 5l6.997 7L15 5"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const IconArrowDown = React.memo(SvgComponent);
export default IconArrowDown;
