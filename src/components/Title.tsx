const Title = ({title} : {title?: string}) => {
  const appName = import.meta.env.VITE_APP_NAME
  return (
    <title>{`${title ?? "Dashboard"} | ${appName}`}</title>
  )
}

export default Title