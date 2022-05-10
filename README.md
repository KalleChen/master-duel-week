# Master Duel Wee

![Screen Shot 2022-05-07 at 3 07 40 PM](https://user-images.githubusercontent.com/48475056/167243761-7aa8a577-fd84-4351-ace5-707ac3ea6a68.png)

A Twitter bot [@MasterDuelWeek](https://twitter.com/masterduelweek) that tweets meta decks in [Master Duel](https://www.konami.com/yugioh/masterduel/us/en/) every week

## Teck list

- [TypeScript](https://www.typescriptlang.org/)
- [Remotion](https://www.remotion.dev/)
- [Twitter API](https://developer.twitter.com/en/docs/twitter-api)
- [Tailwind CSS](https://tailwindcss.com/)
- [ChartJS](https://www.chartjs.org/)
- [Github Actions](https://github.com/features/actions)
- [google/zx](https://github.com/google/zx)

## Getting Start

### Install dependencies

```console
yarn install
```

### Setup environment variables

Follow the `.env.sample` file and create `.env` file


### Fetch duel data

```console
mkdir data
yarn fetch-duel-data
```

### Start preview

```console
yarn start
```

### Render video

```console
yarn build
```

### Post to Twitter

```console
yarn tweet
```

## Contribute

PR is welcome.

Feel free to DM me on Twitter [@kalle_chen](https://twitter.com/kalle_chen) if you have any suggestions.
