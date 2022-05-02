export const BaseBackground: React.FC<{
  title: string
  time: string
  footer: string
}> = (props) => {
  const { children, title, time, footer } = props
  return (
    <div className="relative p-6 h-full w-full bg-secondary">
      <div className="h-full w-full bg-primary rounded-2xl p-8">
        <h1 className="text-center text-4xl font-bold text-textPrimary mb-3">
          {title}
        </h1>
        <h3 className="text-center text-lg font-bold text-textPrimary">
          {time}
        </h3>
        <div className="flex flex-col item-center">{children}</div>
      </div>
      <span className="absolute text-textPrimary bottom-0 right-0 mr-8">
        {footer}
      </span>
    </div>
  )
}
