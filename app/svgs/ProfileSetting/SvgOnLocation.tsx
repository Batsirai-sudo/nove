import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M19.05 23H26l4 8H2l4-8h6.95"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M16 1a9.05 9.05 0 00-9.05 9.05C6.95 18.2 16 26.2 16 26.2s9.05-8 9.05-16.15A9.05 9.05 0 0016 1z"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M16 13a3 3 0 100-6 3 3 0 000 6z"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const SvgOnLocation = React.memo(SvgComponent);
export default SvgOnLocation;
