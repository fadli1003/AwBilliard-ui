const Title = ({title} : {title: string}) => {
  const appName = import.meta.env.VITE_APP_NAME
  return (
    <title>{`${title} | ${appName}`}</title>
  )
}

export default Title