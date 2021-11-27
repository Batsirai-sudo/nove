import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M1 8h14"
        stroke="#ED3269"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgSub = React.memo(SvgComponent);
export default SvgSub;
