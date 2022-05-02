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
      .filter((d) => !!d?.tournamentType?.name)
      .map((d) => ({
        author: d?.author,
        deckType: d?.deckType?.name,
        deckTypeImg: `${DUEL_IMG_URL}/${d?.deckType?.name.replaceAll(
          '/',
          '%2F'
        )}?portrait=true&width=800`,
        date: d?.created,
        tournamentPlacement: d?.tournamentPlacement,
        main: d?.main,
        extra: d?.extra,
        srPrice: d?.srPrice,
        urPrice: d?.urPrice,
      }))
    let result = {
      statistics: {},
      firstDeck: [],
      allData: data,
    }
    data.forEach((d) => {
      if (result.statistics?.[d?.deckType]) {
        result.statistics[d?.deckType].count += 1
      } else {
        result.statistics[d?.deckType] = {
          count: 1,
          img: d?.deckTypeImg,
        }
      }
      if (d.tournamentPlacement === '1st Place') {
        result.firstDeck.push({
          author: d?.author,
          deckType: d?.deckType,
          img: d?.deckTypeImg,
          main: d.main,
          extra: d.extra,
          srPrice: d.srPrice,
          urPrice: d.urPrice,
          date: d.date,
        })
      }
    })
    const sorted = Object.keys(result.statistics).sort((a, b) => {
      return result.statistics[b].count - result.statistics[a].count
    })
    let previousCount = 0
    result.statistics = sorted.map((s) => {
      const statistics = {
        name: s,
        count: result.statistics[s].count,
        img: result.statistics[s].img,
        previousCount: previousCount,
      }
      previousCount += result.statistics[s].count
      return statistics
    })
    fs.writeFileSync(
      path.resolve(__dirname, '../data/duelData.json'),
      prettier.format(JSON.stringify(result), { parser: 'json' })
    )
  } else {
    throw new Error('Invalid response')
  }
} catch (e) {
  console.log(e)
}
