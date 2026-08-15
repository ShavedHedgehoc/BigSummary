import React from "react";
import { useShallow } from "zustand/react/shallow";
import { useCansFilterStore } from "./store/use-cans-filter-store";
import { useCans } from "../../shared/api/use-cans";
import CansCard from "./cans-card";
import InfoPage from "../../shared/components/info-page";

export default function CansView() {
  const filter = useCansFilterStore(useShallow((state) => state.filter));
  const notScrollingCardsQuantity = window.innerWidth > 1280 ? 36 : 30;
  const scrollDelay = 30000;

  const [scrolling, setScrolling] = React.useState(false);
  const [recordsCount, setRecordsCount] = React.useState(0);

  const interval = React.useRef(scrollDelay);
  const { isPending, data, isSuccess } = useCans({ filter: filter });

  const resetTimer = () => {
    setScrolling(false);
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setScrolling(true);
    }, scrollDelay);
    return () => clearInterval(interval.current);
  };

  const countRecords = () => {
    setRecordsCount(isSuccess && data ? data.length : 0);
  };

  React.useEffect(() => {
    resetTimer();
  }, []);

  React.useEffect(() => {
    resetTimer();
    countRecords();
  }, [data]);

  if (isPending) {
    return <InfoPage message="Загружаю..." />;
  }

  if (isSuccess && data.length === 0) {
    return <InfoPage message="Записей не найдено..." />;
  }

  return (
    <React.Fragment>
      <div
        className="bg-gray-950 overflow-hidden w-full relative"
        onTouchMove={() => {
          resetTimer();
        }}
        onMouseMove={() => {
          resetTimer();
        }}
        onScroll={() => {
          resetTimer();
        }}
      >
        <div className="overflow-y-auto scrollbar-none h-full">
          <div
            className={` grid  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6  grid-rows-14 gap-2  overflow-hidden  w-full
                ${
                  scrolling &&
                  recordsCount > notScrollingCardsQuantity &&
                  "animate-[slide1_15s_linear_infinite] absolute top-0 w-full"
                }
                `}
          >
            {isSuccess && data.map((item) => <CansCard key={`Card_${item.id}`} item={item} />)}
          </div>
          <div
            className={` card-anim grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 grid-rows-14 gap-2 overflow-hidden absolute top-0 w-full pt-1                
                 ${
                   scrolling
                     ? recordsCount > notScrollingCardsQuantity
                       ? "animate-[slide2_15s_linear_infinite]"
                       : "invisible"
                     : "invisible"
                 }
                `}
          >
            {isSuccess && data.map((item) => <CansCard key={`Card_${item.id}`} item={item} />)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
