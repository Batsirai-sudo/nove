import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={24} height={22} viewBox="0 0 24 22" fill="none" {...props}>
      <Path
        d="M8 7.154V1h15v20H8v-6.153"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M1 10a1 1 0 000 2v-2zm17 1.999a1 1 0 000-2v2zm-5.178 2.253a1 1 0 001.326 1.496l-1.326-1.496zM18 10.999l.663.748.845-.748-.845-.749L18 11zM14.148 6.25a1 1 0 10-1.326 1.498l1.326-1.498zM1 12l17-.001v-2L1 10v2zm13.148 3.748l4.515-4-1.326-1.497-4.515 4 1.326 1.497zm4.515-5.498l-4.515-3.999-1.326 1.498 4.515 3.999 1.326-1.498z"
        fill="#353B48"
      />
    </Svg>
  );
}

const SvgJoin = React.memo(SvgComponent);
export default SvgJoin;
