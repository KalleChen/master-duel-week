import { Img, spring, useCurrentFrame, useVideoConfig } from 'remotion'

import { DeckList } from '../../shared/interfaces/cardList.interface'
import { Card } from './Card'

export const DuelDeck: React.FC<{ deck: DeckList }> = (props) => {
  const { deck } = props
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const springConfig = {
    damping: 40,
  }

  const translate1 = spring({
    fps,
    from: -100,
    to: 0,
    frame,
    config: springConfig,
  })

  const translate2 = spring({
    fps,
    from: 0,
    to: 100,
    frame: frame - 90,
    config: springConfig,
  })

  const translate3 = spring({
    fps,
    from: 100,
    to: 200,
    frame: frame - 180,
    config: springConfig,
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
    <div className="overflow-hidden">
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
      <div
        className="h-full w-full flex flex-row-reverse pt-10"
        style={{
          transform: `translateX(${
            frame < 90 ? translate1 : frame < 180 ? translate2 : translate3
          }%)`,
        }}
      >
        <div className="w-full h-full flex-shrink-0">
          <h3 className="text-lg font-bold text-textPrimary mb-2">
            Main ({mainTotal})
          </h3>
          <div className="grid grid-cols-8 gap-2 w-full">
            {deck.main.map((card) => (
              <Card key={card.card._id} card={card} />
            ))}
          </div>
        </div>
        <div className="w-full h-full flex-shrink-0">
          <h3 className="text-lg font-bold text-textPrimary my-2">Extra</h3>
          <div className="grid grid-cols-8 gap-2 w-full">
            {deck.extra.map((card) => (
              <Card key={card.card._id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
