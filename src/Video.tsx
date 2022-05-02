import { Composition } from 'remotion'

// import { MainCoinToday } from './MainCoinToday'
import { DuelWeek } from './DuelWeek'

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="base-background"
        component={DuelWeek}
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
