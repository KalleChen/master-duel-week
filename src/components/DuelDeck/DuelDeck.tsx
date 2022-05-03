import { Img } from 'remotion'

import { DeckList } from '../../shared/interfaces/cardList.interface'
import { Card } from './Card'

export const DuelDeck: React.FC<{ deck: DeckList }> = (props) => {
  const { deck } = props
  const mainTotal = deck.main.reduce((acc, card) => acc + card.amount, 0)
  return (
    <>
      <h2 className="text-xl text-center font-bold text-textPrimary mt-2">
        Type: {deck.deckType}
      </h2>
      <Img
        src={deck.img}
        width={80}
        className="absolute right-20 top-20 rounded-full"
      />
      <h3 className="text-lg font-bold text-textPrimary mb-2">
        Main ({mainTotal})
      </h3>
      <div className="grid grid-cols-9 gap-2 w-full">
        {deck.main.map((card) => (
          <Card key={card.card._id} card={card} />
        ))}
      </div>
      <h3 className="text-lg font-bold text-textPrimary my-2">Extra</h3>
      <div className="grid grid-cols-9 gap-2 w-full">
        {deck.extra.map((card) => (
          <Card key={card.card._id} card={card} />
        ))}
      </div>
    </>
  )
}
