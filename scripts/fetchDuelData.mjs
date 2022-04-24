import 'zx/globals'
import 'dotenv/config'
import axios from 'axios'
import prettier from 'prettier'

const DUEL_DATA_URL = process.env.DUEL_DATA_URL
const DUEL_IMG_URL = process.env.DUEL_IMG_URL

try {
  const res = await axios.get(DUEL_DATA_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    params: {
      'created[$gte]': '(days-7)',
      limit: 0,
    },
  })
  if (Array.isArray(res?.data)) {
    const data = res.data
      .filter((d) => d?.tournamentType?.name === 'Community Tournaments')
      .map((d) => ({
        author: d?.author,
        deckType: d?.deckType?.name,
        deckTypeImg: `${DUEL_IMG_URL}/${d?.deckType?.name}?portrait=true&width=800`,
        date: d?.created,
        tournamentPlacement: d?.tournamentPlacement,
        main: d?.tournamentPlacement === '1st Place' ? d?.main : null,
        extra: d?.tournamentPlacement === '1st Place' ? d?.extra : null,
        srPrice: d?.srPrice,
        urPrice: d?.urPrice,
      }))
    console.log(data.length)
    fs.writeFileSync(
      path.resolve(__dirname, '../data/duelData.json'),
      prettier.format(JSON.stringify(data), { parser: 'json' })
    )
  } else {
    throw new Error('Invalid response')
  }
} catch (e) {
  console.log(e)
}
