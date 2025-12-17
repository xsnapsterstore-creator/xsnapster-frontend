import { useEffect, useState } from "react";
import Router from "next/router";

export default function RouteProgress() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-red-500 animate-pulse z-[9999]" />
  );
}
