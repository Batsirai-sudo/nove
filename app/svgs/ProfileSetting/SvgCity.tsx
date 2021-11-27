import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        clipRule="evenodd"
        d="M2 9h10v20H2V9z"
        stroke="#353B48"
        strokeWidth={2}
      />
      <Path
        stroke="#353B48"
        strokeWidth={2}
        d="M5 13h4v4H5zM23 18h4v7h-4zM5 21h4v4H5z"
      />
      <Path stroke="#353B48" strokeWidth={2} d="M20 15h10v14H20z" />
      <Path
        clipRule="evenodd"
        d="M20 9l-4-6-4 6v20h8V9z"
        stroke="#353B48"
        strokeWidth={2}
      />
      <Path
        stroke="#353B48"
        strokeWidth={2}
        d="M15 11h2v2h-2zM15 17h2v2h-2zM15 23h2v2h-2z"
      />
    </Svg>
  );
}

const SvgCity = React.memo(SvgComponent);
export default SvgCity;
