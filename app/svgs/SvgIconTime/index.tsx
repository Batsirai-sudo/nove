import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        clipRule="evenodd"
        d="M8 15.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
        stroke="#353B48"
        strokeLinecap="round"
      />
      <Path d="M8 3.5v4.75L11.25 10" stroke="#353B48" strokeLinecap="round" />
    </Svg>
  );
}

const SvgIconTime = React.memo(SvgComponent);
export default SvgIconTime;
