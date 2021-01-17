import React from "react"
import { AppProps } from "next/app"
import "../styles/styles.css"
import Header from "../components/Header"
import { changeDarkmodeTheme } from "../functions/changeDarkMode"

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  // 初期化
  changeDarkmodeTheme()
  return (
    <div className="wrapper">
      <div className="max-w-screen-lg mx-auto px-5 min-h-screen">
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  )
}

export default App
