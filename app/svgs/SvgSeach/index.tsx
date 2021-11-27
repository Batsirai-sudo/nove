import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M16 16l5 5"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        clipRule="evenodd"
        d="M9.5 18a8.5 8.5 0 100-17 8.5 8.5 0 000 17z"
        strokeWidth={2}
        stroke={props.color}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgSeach = React.memo(SvgComponent);
export default SvgSeach;
