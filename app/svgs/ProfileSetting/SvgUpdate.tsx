import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

// @ts-ignore
function SvgComponent(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M22.64 22.049h1.475c3.53 0 6.393-2.84 6.393-6.342s-2.862-6.341-6.393-6.341h-.246c-1.522-3.348-5.082-5.304-8.75-4.809-3.669.496-6.572 3.326-7.135 6.955a5.437 5.437 0 00-5.537 1.67 5.332 5.332 0 00-.848 5.677 5.41 5.41 0 004.811 3.19h2.459"
        stroke="#353B48"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.754 19.268a1 1 0 00-2 0h2zm-2 10.732a1 1 0 102 0h-2zm-2.23-4.613a1 1 0 00-1.408 1.42l1.408-1.42zM15.754 30l-.704.71a1 1 0 001.409 0l-.705-.71zm4.639-3.193a1 1 0 00-1.409-1.42l1.409 1.42zm-5.639-7.539V30h2V19.268h-2zm-3.638 7.54l3.934 3.902 1.409-1.42-3.935-3.903-1.408 1.42zm5.343 3.902l3.934-3.903-1.409-1.42-3.934 3.903 1.409 1.42z"
        fill="#353B48"
      />
    </Svg>
  );
}

const SvgUpdate = React.memo(SvgComponent);
export default SvgUpdate;
