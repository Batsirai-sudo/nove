import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M16 16l5 5"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        clipRule="evenodd"
        d="M9.5 18a8.5 8.5 0 100-17 8.5 8.5 0 000 17z"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgSearch = React.memo(SvgComponent);
export default SvgSearch;
