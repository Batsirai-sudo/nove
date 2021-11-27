import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        clipRule="evenodd"
        d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"
        stroke="#ED3269"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        clipRule="evenodd"
        d="M9.433 14.933l1.467-4.4 4.4-1.466-1.467 4.4-4.4 1.466z"
        stroke="#ED3269"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgLocation = React.memo(SvgComponent);
export default SvgLocation;
