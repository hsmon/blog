import React from "react"
import { AppProps } from "next/app"
import "../styles/styles.css"
import Header from "../components/Header"
import { changeDarkmodeTheme } from "../functions/changeDarkMode"
import { Router, useRouter } from "next/router"
import * as ga from "../lib/ga"

function App({ Component, pageProps }: AppProps) {
  // 初期化
  changeDarkmodeTheme()
  const router = useRouter()

  React.useEffect(() => {
    const handleRouteChange = (url: string) => ga.pageview(url)
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => router.events.off("routeChangeComplete", handleRouteChange)
  }, [router.events])

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
