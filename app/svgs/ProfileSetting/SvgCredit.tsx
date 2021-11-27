import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M31 8.5h1-1zm-30 0H0h1zM1 12H0a1 1 0 001 1v-1zm30 0v1a1 1 0 001-1h-1zM1 12v-1a1 1 0 00-1 1h1zm30 0h1a1 1 0 00-1-1v1zm1-3.5A2.5 2.5 0 0029.5 6v2a.5.5 0 01.5.5h2zM29.5 6h-27v2h27V6zm-27 0A2.5 2.5 0 000 8.5h2a.5.5 0 01.5-.5V6zM0 8.5V12h2V8.5H0zM1 13h30v-2H1v2zm31-1V8.5h-2V12h2zM0 12v12.5h2V12H0zm0 12.5A2.5 2.5 0 002.5 27v-2a.5.5 0 01-.5-.5H0zM2.5 27h27v-2h-27v2zm27 0a2.5 2.5 0 002.5-2.5h-2a.5.5 0 01-.5.5v2zm2.5-2.5V12h-2v12.5h2zM31 11H1v2h30v-2zM5 15a1 1 0 100 2v-2zm10 2a1 1 0 100-2v2zm9-2a1 1 0 100 2v-2zm3 2a1 1 0 100-2v2zM5 19a1 1 0 100 2v-2zm4 2a1 1 0 100-2v2zm-4-4h10v-2H5v2zm19 0h3v-2h-3v2zM5 21h4v-2H5v2z"
        fill="#353B48"
      />
    </Svg>
  );
}

const SvgCredit = React.memo(SvgComponent);
export default SvgCredit;
