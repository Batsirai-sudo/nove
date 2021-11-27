import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        clipRule="evenodd"
        d="M12.267 5.4a2.2 2.2 0 100-4.4 2.2 2.2 0 000 4.4z"
        stroke="#ED3269"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M14.467 17.207c4.62.293 8.066 1.466 8.066 2.86C22.533 21.46 17.95 23 12.267 23 6.583 23 2 21.68 2 20.067c0-1.614 3.447-2.567 8.067-2.86"
        stroke="#ED3269"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        clipRule="evenodd"
        d="M15.933 6.867H8.6a.733.733 0 00-.733.733V12c0 .405.328.733.733.733h1.467v5.5a1.1 1.1 0 001.1 1.1h2.2a1.1 1.1 0 001.1-1.1v-5.5h1.466a.733.733 0 00.734-.733V7.6a.733.733 0 00-.734-.733z"
        stroke="#ED3269"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const IconAroundU = React.memo(SvgComponent);
export default IconAroundU;
