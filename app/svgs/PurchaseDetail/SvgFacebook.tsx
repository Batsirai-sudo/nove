import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Rect width={32} height={32} rx={16} fill="#3B5998" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.333 14h2l-.25 2h-1.75v6H14.74v-6h-1.407v-2h1.406v-1.344c0-.875.22-1.536.657-1.984.437-.448 1.166-.672 2.187-.672h1.75v2h-1.062c-.396 0-.651.063-.766.188-.114.124-.172.333-.172.624V14z"
        fill="#fff"
      />
    </Svg>
  );
}

const SvgFacebook = React.memo(SvgComponent);
export default SvgFacebook;
