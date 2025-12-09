import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/components/store/store";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </QueryClientProvider>
    </Provider>
  );
}
