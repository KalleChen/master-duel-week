import { BaseBackground } from './components/BaseBackground'
import CoinList from './components/CoinList'

export const MainCoinToday: React.FC = () => {
  return (
    <BaseBackground>
      <CoinList start={0} end={5} />
    </BaseBackground>
  )
}
