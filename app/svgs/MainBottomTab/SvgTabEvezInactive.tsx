import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        clipRule="evenodd"
        d="M1 1h20v20H1V1z"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M14 5h3M14 9h3M14 13h3M5 17h12"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        clipRule="evenodd"
        d="M5 5h5v8H5V5z"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgTabEvezInactive = React.memo(SvgComponent);
export default SvgTabEvezInactive;
