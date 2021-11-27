import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M2 11h28.02M2 21h28.02M25.053 2.052l-5.947 28.015M14.053 2.052L8.106 30.067"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgHashTag = React.memo(SvgComponent);
export default SvgHashTag;
