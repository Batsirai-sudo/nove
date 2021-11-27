import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        clipRule="evenodd"
        d="M6.923 9.077L7.731 15 15 1 1 8.27l5.923.807z"
        stroke="#ED3269"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const IconDirection = React.memo(SvgComponent);
export default IconDirection;
