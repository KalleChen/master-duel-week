import { add } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

import { BaseBackground } from './components/BaseBackground'
import DuelCircle from './components/DuelCircle'

export const DuelWeek: React.FC = () => {
  return (
    <BaseBackground
      title="Top Deck on MD Tournament last week"
      time={`${formatInTimeZone(
        add(new Date(), { weeks: -1 }),
        'America/New_York',
        'yyyy,MM,dd'
      )} - ${formatInTimeZone(new Date(), 'America/New_York', 'yyyy,MM,dd')}`}
      footer="@MasterDuelWeek"
    >
      <DuelCircle />
    </BaseBackground>
  )
}
