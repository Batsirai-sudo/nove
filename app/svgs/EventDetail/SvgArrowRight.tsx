import * as React from "react"
import Svg, { Path } from "react-native-svg"
interface Props {
  color?: string;
}
function SvgComponent(props: Props) {
  const color = props.color || "#ED3269";
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" >
      <Path
        d="M6 4l4 3.998L6 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

const SvgArrowRight = React.memo(SvgComponent)
export default SvgArrowRight
