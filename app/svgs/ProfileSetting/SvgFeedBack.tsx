import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        clipRule="evenodd"
        d="M16 31c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C7.716 1 1 7.716 1 16c0 8.284 6.716 15 15 15z"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 12a1 1 0 100 2v-2zm2 1h1a1 1 0 00-1-1v1zm-1 11a1 1 0 102 0h-2zm-1-.996a1 1 0 100 2v-2zm4 2a1 1 0 100-2v2zM14 14h2v-2h-2v2zm1-1v11h2V13h-2zm-1 12.004h4v-2h-4v2z"
        fill="#353B48"
      />
      <Path
        clipRule="evenodd"
        d="M15.5 10.5a1 1 0 100-2 1 1 0 000 2z"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const SvgFeedBack = React.memo(SvgComponent);
export default SvgFeedBack;
