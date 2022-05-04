import { Img, spring, useCurrentFrame, useVideoConfig } from 'remotion'

import { DeckList } from '../../shared/interfaces/cardList.interface'
import { Card } from './Card'

export const DuelDeck: React.FC<{ deck: DeckList }> = (props) => {
  const { deck } = props
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const mainTranslate = spring({
    fps,
    from: -150,
    to: 0,
    frame: frame - 10,
    config: {
      damping: 40,
    },
  })
  const extraTranslate = spring({
    fps,
    from: -150,
    to: 0,
    frame: frame - 20,
    config: {
      damping: 40,
    },
  })
  const iconTranslate = spring({
    fps,
    from: -150,
    to: 0,
    frame,
    config: {},
  })
  const mainTotal = deck.main.reduce((acc, card) => acc + card.amount, 0)
  return (
    <>
      <h2
        className="text-xl text-center font-bold text-textPrimary mt-2"
        style={{ transform: `translate(0, ${iconTranslate}px)` }}
      >
        Type: {deck.deckType}
      </h2>
      <Img
        src={deck.img}
        width={80}
        className="absolute right-20 top-20 rounded-full"
        style={{ transform: `translate(0, ${iconTranslate}px)` }}
      />
      <h3 className="text-lg font-bold text-textPrimary mb-2">
        Main ({mainTotal})
      </h3>
      <div
        className="grid grid-cols-9 gap-2 w-full"
        style={{ transform: `translate(${mainTranslate}%)` }}
      >
        {deck.main.map((card) => (
          <Card key={card.card._id} card={card} />
        ))}
      </div>
      <h3 className="text-lg font-bold text-textPrimary my-2">Extra</h3>
      <div
        className="grid grid-cols-9 gap-2 w-full"
        style={{ transform: `translate(${extraTranslate}%)` }}
      >
        {deck.extra.map((card) => (
          <Card key={card.card._id} card={card} />
        ))}
      </div>
    </>
  )
}
