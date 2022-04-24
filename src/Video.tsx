import { Composition } from 'remotion'

import { MainCoinToday } from './MainCoinToday'

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="base-background"
        component={MainCoinToday}
        durationInFrames={150}
        fps={30}
        width={720}
        height={720}
        defaultProps={{
          titleText: 'Welcome to Remotion',
          titleColor: 'black',
        }}
      />
    </>
  )
}
