import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M0 2h3.667l3.666 15.385h11.734L22 8.154H5.133"
        stroke="#353B48"
        strokeWidth={2}
      />
      <Path
        clipRule="evenodd"
        d="M7.7 22c.81 0 1.467-.689 1.467-1.539S8.51 18.923 7.7 18.923s-1.467.689-1.467 1.538c0 .85.657 1.539 1.467 1.539zM17.233 22c.81 0 1.467-.689 1.467-1.539s-.657-1.538-1.467-1.538-1.466.689-1.466 1.538c0 .85.656 1.539 1.466 1.539z"
        stroke="#353B48"
        strokeWidth={2}
      />
    </Svg>
  );
}

const SvgCart = React.memo(SvgComponent);
export default SvgCart;
