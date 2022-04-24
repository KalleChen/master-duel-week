import data from '../../../data/mainCoin.json'
import { CoinListItem } from './CoinListItem'

type Coin = {
  id: string
  name: string
  image: string
  current_price: number
  price_change_24h: number
}

export const CoinList: React.FC<{
  start: number
  end: number
}> = ({ start, end }) => {
  return (
    <div className="flex flex-col pl-10">
      {Array.isArray(data) &&
        data
          .slice(start, end)
          .map((coin: Coin) => (
            <CoinListItem
              key={coin.id}
              imgUrl={coin.image}
              name={coin.name}
              price={coin.current_price}
              percentChange={coin.price_change_24h}
            />
          ))}
    </div>
  )
}
