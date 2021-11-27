import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={31} height={30} viewBox="0 0 31 30" fill="none" {...props}>
      <Path
        clipRule="evenodd"
        d="M12.933 15l-4.909 6.46L28.435 15 8.025 8.54 12.932 15z"
        stroke="#ED3269"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const SvgSend = React.memo(SvgComponent);
export default SvgSend;
