import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15z"
        fill="#ED3269"
      />
      <Path
        clipRule="evenodd"
        d="M15 13a3 3 0 100-6 3 3 0 000 6zM9 19.367V21h12v-1.633c-.027-3.504-2.698-6.338-6-6.367-3.302.029-5.973 2.863-6 6.367z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const UserLocation = React.memo(SvgComponent);
export default UserLocation;
