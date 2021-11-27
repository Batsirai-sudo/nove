import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M5.12 16H1V1h15v4.12"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        clipRule="evenodd"
        d="M6 6h15v15H6V6z"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgHomeTab = React.memo(SvgComponent);
export default SvgHomeTab;
