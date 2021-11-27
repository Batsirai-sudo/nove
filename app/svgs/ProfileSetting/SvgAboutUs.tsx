import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M13.983 18.45a5.574 5.574 0 00.892 4.82 5.38 5.38 0 004.322 2.18h2.901L26.574 30v-4.75c2.613-.737 4.286-3.326 3.913-6.057-.373-2.73-2.677-4.759-5.389-4.743h-.344"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M18.213 3.45H8.377c-3.57.028-6.609 2.652-7.213 6.23-.605 3.578 1.398 7.082 4.754 8.32v5.95l5.41-5.5h6.885c4.074 0 7.377-3.358 7.377-7.5 0-4.142-3.303-7.5-7.377-7.5v0z"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const SvgAboutUs = React.memo(SvgComponent);
export default SvgAboutUs;
