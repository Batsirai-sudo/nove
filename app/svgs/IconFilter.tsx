import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" >
      <Path
        d="M3.4 1.933a1 1 0 10-2 0h2zM1.4 12.2a1 1 0 102 0h-2zM9 9.4a1 1 0 10-2 0h2zm-2 4.667a1 1 0 102 0H7zM9 1.933a1 1 0 10-2 0h2zM7 6.6a1 1 0 002 0H7zm7.6-2.8a1 1 0 10-2 0h2zm-2 10.267a1 1 0 102 0h-2zM1.4 1.933V12.2h2V1.933h-2zM7 9.4v4.667h2V9.4H7zm0-7.467V6.6h2V1.933H7zM12.6 3.8v10.267h2V3.8h-2z"
        fill="#353B48"
      />
      <Path
        clipRule="evenodd"
        d="M2.4 15a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8zM13.6 3.8a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8zM8 9.4a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8z"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const IconFilter = React.memo(SvgComponent);
export default IconFilter;
