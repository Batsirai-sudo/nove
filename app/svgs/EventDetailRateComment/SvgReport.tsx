import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        clipRule="evenodd"
        d="M7.444 23L1 16.556V7.443L7.444 1h9.113L23 7.443v9.113L16.557 23H7.444z"
        stroke="#fff"
        strokeWidth={2}
      />
      <Path
        d="M12 5.033v7.797"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        clipRule="evenodd"
        d="M12 17.5a.733.733 0 100-1.467.733.733 0 000 1.467z"
        stroke="#fff"
        strokeWidth={2}
      />
    </Svg>
  );
}

const SvgReport = React.memo(SvgComponent);
export default SvgReport;
