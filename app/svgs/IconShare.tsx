import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.486 14.546l8.14 4.033.888-1.792-8.14-4.033-.888 1.792zm8.14-9.125l-8.14 4.033.888 1.792 8.14-4.033-.888-1.792z"
        fill="#fff"
      />
      <Path
        clipRule="evenodd"
        d="M4.667 15.667a3.667 3.667 0 100-7.334 3.667 3.667 0 000 7.334zM19.333 8.333a3.667 3.667 0 100-7.333 3.667 3.667 0 000 7.333zM19.333 23a3.667 3.667 0 100-7.333 3.667 3.667 0 000 7.333z"
        stroke="#fff"
        strokeWidth={2}
      />
    </Svg>
  );
}

const IconShare = React.memo(SvgComponent);
export default IconShare;
