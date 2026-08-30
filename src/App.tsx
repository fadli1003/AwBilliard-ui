import { ThemeProvider } from "./components/theme-provider"

function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="awbilliard-theme">
      {children}
    </ThemeProvider>
  )
}

export default App
