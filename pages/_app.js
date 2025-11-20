import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/components/store/store";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ReviewCarousel from "@/components/Reviews/review";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <ReviewCarousel />
      <Footer />
    </Provider>
  );
}
