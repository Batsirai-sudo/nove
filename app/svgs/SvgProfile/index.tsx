import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={20} height={22} viewBox="0 0 20 22" fill="none" {...props}>
      <Path
        clipRule="evenodd"
        d="M10 11a5 5 0 100-10 5 5 0 000 10zM10 11c-4.954.039-8.96 3.854-9 8.571V21h18v-1.429c-.04-4.717-4.046-8.532-9-8.571v0z"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const SvgProfile = React.memo(SvgComponent);
export default SvgProfile;
