import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        clipRule="evenodd"
        d="M10.5 4C9.417 4 8.35 4.7 8 5.667 7.65 4.7 6.583 4 5.5 4A2.5 2.5 0 003 6.5c0 2.167 1.833 4.333 5 6.5 3.167-2.167 5-4.333 5-6.5A2.5 2.5 0 0010.5 4z"
        stroke="#353B48"
      />
    </Svg>
  );
}

const SvgUnlike = React.memo(SvgComponent);
export default SvgUnlike;
