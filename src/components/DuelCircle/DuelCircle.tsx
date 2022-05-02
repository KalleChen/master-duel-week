import { spring, useCurrentFrame, useVideoConfig } from 'remotion'

import { CircleCanvas } from './CircleCanvas'

export const DuelCircle: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const scale = spring({
    fps,
    from: 0,
    to: 1,
    frame,
  })

  return (
    <div className="w-full h-full flex justify-center align-center">
      <div
        className="relative w-10/12 h-10/12"
        style={{ transform: `scale(${scale})` }}
      >
        <CircleCanvas />
      </div>
    </div>
  )
}
