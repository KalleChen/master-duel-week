export type CardType = {
  card: {
    _id: string
    name: string
    img: string
  }
  amount: number
}

export interface DeckList {
  author: string
  deckType: string
  img: string
  main: CardType[]
  extra: CardType[]
}
