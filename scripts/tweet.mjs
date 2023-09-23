import 'zx/globals'
import 'dotenv/config'
import { TwitterApi } from 'twitter-api-v2'
const { formatInTimeZone } = require('date-fns-tz')
const { add } = require('date-fns')

const data = require('../data/duelData.json')

const TWITTER_API_KEY = process.env.TWITTER_API_KEY
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN
const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET

const getMainText = () => {
  const time = `${formatInTimeZone(
    add(new Date(), { weeks: -1 }),
    'America/New_York',
    'MMMM dd, yyyy'
  )} ~ ${formatInTimeZone(new Date(), 'America/New_York', 'MMMM dd, yyyy')}`
  let text = `🔥 Meta Decks on Tournament last Week\n📅 ${time}\n\n`
  text += '#MasterDuel #YuGiOh #遊戯王マスターデュエル'
  return text
}

const getDetailText = () => {
  let text = ''
  data.statistics
    .filter((d) => d.count > 1)
    .slice(0, 10)
    .forEach((stat) => {
      text += `- ${stat.name.replace('@', '@ ')}: ${stat.count}\n`
    })
  return text
}

try {
  const client = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_SECRET,
    accessToken: TWITTER_ACCESS_TOKEN,
    accessSecret: TWITTER_ACCESS_TOKEN_SECRET,
  })
  const mediaVideoId = await client.v1.uploadMedia(
    path.resolve(__dirname, '../out/video.mp4')
  )
  const createdTweet = await client.v2.tweetThread([
    {
      text: getMainText(),
      media: { media_ids: [mediaVideoId] },
    },
    getDetailText(),
  ])
} catch (e) {
  console.log(e)
}
