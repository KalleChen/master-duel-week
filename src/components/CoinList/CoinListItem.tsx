import { Img } from 'remotion'

type Props = {
  imgUrl: string
  name: string
  price: number
  percentChange: number
}

export const CoinListItem = (props: Props): JSX.Element => {
  const { imgUrl, name, price, percentChange } = props
  const isUp = React.useMemo(() => percentChange > 0, [percentChange])
  return (
    <div className="flex flex-row items-center my-6">
      <Img className="w-14 h-14 rounded-full mr-8" src={imgUrl} alt={name} />
      <span className="text-textPrimary text-3xl font-medium mr-8">{name}</span>
      <span className="text-secondary text-xl mr-8">${price}</span>
      <span
        className={`material-symbols-outlined text-${
          isUp ? 'green' : 'red'
        }-500`}
      >
        arrow_drop_up
      </span>
      <span className={`text-${isUp ? 'green' : 'red'}-500 text-md mr-8`}>
        {percentChange}
      </span>
    </div>
  )
}
