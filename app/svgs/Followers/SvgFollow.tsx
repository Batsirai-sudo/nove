import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        clipRule="evenodd"
        d="M9 13a4 4 0 100-8 4 4 0 000 8zM1 20.96V23h16v-2.04c-.036-4.382-3.597-7.924-8-7.96-4.403.036-7.964 3.578-8 7.96z"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M20.5 1a1 1 0 10-2 0h2zm-2 7a1 1 0 102 0h-2zM16 3.5a1 1 0 100 2v-2zm7 2a1 1 0 100-2v2zM18.5 1v7h2V1h-2zM16 5.5h7v-2h-7v2z"
        fill="#353B48"
      />
    </Svg>
  );
}

const SvgFollow = React.memo(SvgComponent);
export default SvgFollow;
