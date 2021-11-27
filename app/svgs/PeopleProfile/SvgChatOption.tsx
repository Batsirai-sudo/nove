import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M4 12a1 1 0 01-1 1v2a3 3 0 003-3H4zm-1-1a1 1 0 011 1h2a3 3 0 00-3-3v2zm-1 1a1 1 0 011-1V9a3 3 0 00-3 3h2zm1 1a1 1 0 01-1-1H0a3 3 0 003 3v-2zm10-1a1 1 0 01-1 1v2a3 3 0 003-3h-2zm-1-1a1 1 0 011 1h2a3 3 0 00-3-3v2zm-1 1a1 1 0 011-1V9a3 3 0 00-3 3h2zm1 1a1 1 0 01-1-1H9a3 3 0 003 3v-2zm9 2a3 3 0 003-3h-2a1 1 0 01-1 1v2zm-3-3a3 3 0 003 3v-2a1 1 0 01-1-1h-2zm3-3a3 3 0 00-3 3h2a1 1 0 011-1V9zm3 3a3 3 0 00-3-3v2a1 1 0 011 1h2z"
        fill="#fff"
      />
    </Svg>
  );
}

const SvgChatOption = React.memo(SvgComponent);
export default SvgChatOption;
