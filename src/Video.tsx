import { Composition } from 'remotion'

import duelData from '../data/duelData.json'
// import { MainCoinToday } from './MainCoinToday'
import { DuelWeek } from './DuelWeek'

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="duel-week"
        component={DuelWeek}
        durationInFrames={duelData.firstDeck.length * 180 + 100}
        fps={30}
        width={720}
        height={720}
      />
    </>
  )
}
