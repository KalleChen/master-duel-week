import { add } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { Sequence } from 'remotion'

import duelData from '../data/duelData.json'
import { BaseBackground } from './components/BaseBackground'
import DuelCircle from './components/DuelCircle'
import DuelDeck from './components/DuelDeck'
import { DeckList } from './shared/interfaces/cardList.interface'

export const DuelWeek: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={100}>
        <BaseBackground
          title="Top Deck on MD Tournament last week"
          time={`${formatInTimeZone(
            add(new Date(), { weeks: -1 }),
            'America/New_York',
            'yyyy,MM,dd'
          )} - ${formatInTimeZone(
            new Date(),
            'America/New_York',
            'yyyy,MM,dd'
          )}`}
          footer="@MasterDuelWeek"
        >
          <DuelCircle />
        </BaseBackground>
      </Sequence>
      {duelData.firstDeck.map((deck, index) => (
        <Sequence key={index} from={180 * index + 100} durationInFrames={180}>
          <BaseBackground
            title="1st Place's Deck"
            time=""
            footer="@MasterDuelWeek"
          >
            <DuelDeck deck={deck as DeckList} />
          </BaseBackground>
        </Sequence>
      ))}
    </>
  )
}
