import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12h20M9.778 4L2 12l7.778 8"
        stroke={props.color ? props.color : '#fff'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const SvgArrowBack = React.memo(SvgComponent);
export default SvgArrowBack;
