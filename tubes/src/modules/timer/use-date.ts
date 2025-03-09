import * as React from "react";
export const useDate = () => {
  const locale = "ru";
  const [today, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  // const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = today.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: false,
    minute: "numeric",
    second: "numeric",
  });

  return {
    date,
    time,
  };
};
