import * as React from "react";

export default function useDebounce(value: any, wait = 500) {
  const [deboncedValue, setDeboncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDeboncedValue(value);
    }, wait);
    return () => clearTimeout(timer);
  }, [value, wait]);

  return deboncedValue;
}
