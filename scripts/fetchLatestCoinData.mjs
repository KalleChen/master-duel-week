import 'zx/globals'
import 'dotenv/config'
import axios from 'axios'
import prettier from 'prettier'

const COINMARKETCAP_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency'
const API_KEY = process.env.COINMARKETCAP_API_KEY
const MOST_VISITED_SUB_URL = '/listings/latest'

try {
  await $`mkdir ../data`
} catch (e) {
  console.log('data folder already exists', e)
}

try {
  const res = await axios.get(COINMARKETCAP_URL + MOST_VISITED_SUB_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-CMC_PRO_API_KEY': API_KEY,
    },
    params: {
      limit: 10,
      sort: 'date_added',
    },
  })

  fs.writeFileSync(
    path.resolve(__dirname, '../data/todayLatestCoin.json'),
    prettier.format(JSON.stringify(res?.data?.data), { parser: 'json' })
  )
} catch (e) {
  console.log(e)
}
