import { formatInTimeZone } from 'date-fns-tz'

export const BaseBackground: React.FC<{ title: string }> = (props) => {
  const { children, title } = props
  return (
    <div className="relative p-6 h-full w-full bg-primary">
      <div className="h-full w-full bg-white rounded-3xl p-8">
        <h1 className="text-center text-4xl font-bold text-secondary mb-4">
          {title}
        </h1>
        <h3 className="text-center text-xl font-bold text-textPrimary">
          {formatInTimeZone(new Date(), 'America/New_York', 'MMMM d, yyyy')}
        </h3>
        <div className="flex flex-col item-center">{children}</div>
      </div>
      <span className="absolute bottom-0 right-0 mr-8">@CryptoToday</span>
    </div>
  )
}
