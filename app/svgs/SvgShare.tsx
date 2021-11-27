import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M7.486 14.546l8.14 4.034.888-1.792-8.14-4.034-.888 1.792zm8.14-9.125l-8.14 4.033.888 1.792 8.14-4.033-.888-1.792z"
        fill="#fff"
      />
      <Path
        clipRule="evenodd"
        d="M4.667 15.667a3.667 3.667 0 100-7.333 3.667 3.667 0 000 7.333zM19.333 8.333a3.667 3.667 0 100-7.333 3.667 3.667 0 000 7.333zM19.333 23a3.667 3.667 0 100-7.334 3.667 3.667 0 000 7.334z"
        stroke="#fff"
        strokeWidth={2}
      />
    </Svg>
  );
}

const SvgShare = React.memo(SvgComponent);
export default SvgShare;
