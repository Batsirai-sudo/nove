import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        clipRule="evenodd"
        d="M12 23c6.076 0 11-4.925 11-11S18.076 1 12 1C5.926 1 1 5.925 1 12s4.925 11 11 11z"
        stroke="#ED3269"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M16.5 8.668a1 1 0 10-1.426-1.402l1.425 1.402zm-9.36 6.665a1 1 0 001.425 1.402l-1.426-1.402zm7.933 1.402a1 1 0 101.426-1.402l-1.425 1.402zm-6.508-9.47A1 1 0 107.14 8.669l1.426-1.402zm6.509 0l-7.935 8.068 1.426 1.402 7.934-8.067-1.425-1.402zm1.425 8.068L8.565 7.266 7.14 8.668l7.934 8.067 1.426-1.402z"
        fill="#ED3269"
      />
    </Svg>
  );
}

const SvgUn_follow = React.memo(SvgComponent);
export default SvgUn_follow;
