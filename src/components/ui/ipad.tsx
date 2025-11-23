import { useId, type SVGProps } from "react"

export interface IpadProps extends SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  src?: string
}

const FRAME_X = 18.58
const FRAME_Y = 15.94
const FRAME_WIDTH = 482.84
const FRAME_HEIGHT = 368.91

export function Ipad({ width = 520, height = 400, src, ...props }: IpadProps) {
  const clipPathId = `ipad-screen-${useId().replace(/:/g, "")}`
  const screenX = 31.37
  const screenY = 28.47
  const screenWidth = 457.25
  const screenHeight = 342.87
  const screenRadius = 9.61

  return (
    <svg
      width={width}
      height={height}
      viewBox={`${FRAME_X} ${FRAME_Y} ${FRAME_WIDTH} ${FRAME_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="#aaabac"
        d="M479.04,14.14H88.14v-.59c0-.16-.13-.3-.3-.3h-16.7c-.16,0-.3.13-.3.3v.59h-3.46v-.59c0-.16-.13-.3-.3-.3h-16.7c-.16,0-.3.13-.3.3v.59h-9.13c-13.4,0-24.27,10.78-24.45,24.14h-.48c-.16,0-.3.13-.3.3v20.07c0,.16.13.3.3.3h.47v303.38c0,13.51,10.95,24.45,24.45,24.45h438.08c13.51,0,24.45-10.95,24.45-24.45V38.6c0-13.51-10.95-24.45-24.45-24.45Z"
      />
      <rect
        fill="#000"
        x={FRAME_X}
        y={FRAME_Y}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        rx="23.29"
        ry="23.29"
      />
      <rect
        fill="currentColor"
        x={screenX}
        y={screenY}
        width={screenWidth}
        height={screenHeight}
        rx={screenRadius}
        ry={screenRadius}
      />
      {src && (
        <g clipPath={`url(#${clipPathId})`}>
          <image
            href={src}
            x={screenX}
            y={screenY}
            width={screenWidth}
            height={screenHeight}
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      )}
      <circle fill="#0a1054" cx="245.1" cy="22.23" r="2.44" />
      <circle fill="#333" cx="274.98" cy="22.23" r=".88" />
      <defs>
        <clipPath id={clipPathId}>
          <rect
            fill="#ffffff"
            x={screenX}
            y={screenY}
            width={screenWidth}
            height={screenHeight}
            rx={screenRadius}
            ry={screenRadius}
          />
        </clipPath>
      </defs>
    </svg>
  )
}
