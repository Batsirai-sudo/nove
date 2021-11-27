import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={8} height={13} viewBox="0 0 8 13" fill="none" {...props}>
      <Path
        d="M1.5 1.5l5 4.997-5 5.003"
        stroke="#7F8FA6"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgBack = React.memo(SvgComponent);
export default SvgBack;
