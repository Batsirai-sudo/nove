import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M9 14A5 5 0 119 4a5 5 0 010 10z" fill="#ED3269" />
      <Path
        d="M0 20.96c.04-4.937 4.044-8.92 9.008-8.96 4.948.04 8.951 4.023 8.992 8.96V24H0v-3.04z"
        fill="#ED3269"
      />
      <Path
        d="M15 4.192L17.877 7 23 2"
        stroke="#ED3269"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgFollowed = React.memo(SvgComponent);
export default SvgFollowed;
