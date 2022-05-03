import { Img } from 'remotion'

import { CardType } from '../../shared/interfaces/cardList.interface'

export const Card: React.FC<{ card: CardType }> = ({ card }) => {
  console.log(card.amount)
  return (
    <div className="relative w-full">
      <Img src={card?.card?.img} width={60} />
      {card?.amount === 2 && (
        <Img
          src={process.env.CARD_TWO_IMG_URL}
          width={35}
          className="absolute bottom-1 left-3"
        />
      )}
      {card?.amount === 3 && (
        <Img
          src={process.env.CARD_THREE_IMG_URL}
          width={35}
          className="absolute bottom-1 left-3"
        />
      )}
    </div>
  )
}
