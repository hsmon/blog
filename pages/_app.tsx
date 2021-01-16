import { AppProps } from "next/app"
import "../styles/styles.css"
import Header from '../components/Header'

function App({ Component, pageProps }: AppProps) {
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
