import 'zx/globals'
import 'dotenv/config'
import axios from 'axios'
import prettier from 'prettier'

const COINMARKETCAP_URL = 'https://api.coingecko.com/api/v3'
const MOST_VISITED_SUB_URL = '/coins/markets'

try {
  const res = await axios.get(COINMARKETCAP_URL + MOST_VISITED_SUB_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
    },
  })

  fs.writeFileSync(
    path.resolve(__dirname, '../data/mainCoin.json'),
    prettier.format(JSON.stringify(res?.data), { parser: 'json' })
  )
} catch (e) {
  console.log(e)
}
