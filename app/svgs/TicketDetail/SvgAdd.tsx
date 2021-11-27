import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M9 1a1 1 0 00-2 0h2zM7 15a1 1 0 102 0H7zM1 7a1 1 0 000 2V7zm14 2a1 1 0 100-2v2zM7 1v14h2V1H7zM1 9h14V7H1v2z"
        fill="#ED3269"
      />
    </Svg>
  );
}

const SvgAdd = React.memo(SvgComponent);
export default SvgAdd;
