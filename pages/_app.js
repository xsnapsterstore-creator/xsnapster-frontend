import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '@/components/store/store'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RouteProgress from '@/components/Router_Progress/RouteProgress'
import Script from 'next/script'

const queryClient = new QueryClient()
export default function App ({ Component, pageProps }) {
  return (
    <>
      {/* Load Google Analytics library */}
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-BYLWCFZ8V6'
        strategy='afterInteractive'
      />

      {/* Initialize GA */}
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BYLWCFZ8V6');
        `}
      </Script>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouteProgress />
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </QueryClientProvider>
      </Provider>
    </>
  )
}
