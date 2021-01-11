import { AppProps } from "next/app"
import "../styles/styles.css"
import Header from '../components/Header'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white max-w-screen-lg mx-auto px-5">
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default App
