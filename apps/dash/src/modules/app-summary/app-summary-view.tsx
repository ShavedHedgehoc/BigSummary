import React from 'react';
// import { IPlant } from '../../shared/api/services/plant-service';
import InfoPage from '../../shared/components/info-page';
// import AppSummaryCard from "./app-summary-card";
// import { useAppDoc } from '../../shared/api/use-app-doc';
import { useAppSummaryStore } from './store/use-app-summary-store';
import { useShallow } from 'zustand/react/shallow';
import SummaryCard from '../summary/summary-card';
import { TDashPlantByValueOutput } from '@repo/schemas';
import { trpc } from '../../shared/api';

export default function AppSummaryView(plant: TDashPlantByValueOutput) {
  const notScrollingCardsQuantity = window.innerWidth > 1280 ? 48 : 30;
  const scrollDelay = 3000;

  const [scrolling, setScrolling] = React.useState(false);
  const [recordsCount, setRecordsCount] = React.useState(0);

  const interval = React.useRef(scrollDelay);

  const current = useAppSummaryStore(useShallow((state) => state.current));

  // const { data, isSuccess, isLoading } = useAppDoc(plant.id, current);
  const { data, isSuccess, isLoading } = trpc.dash.doc.getDocDataCurrentApp.useQuery(
    { current, plantId: plant.id },
    { refetchInterval: 10000 },
  );

  const resetTimer = () => {
    setScrolling(false);
    clearInterval(interval.current);
    // interval.current = setInterval(() => {
    interval.current = window.setInterval(() => {
      setScrolling(true);
    }, scrollDelay);
    return () => clearInterval(interval.current);
  };

  const countRecords = React.useCallback(() => {
    if (!data) return;
    setRecordsCount(isSuccess && data.records ? data.records.length : 0);
  }, [data, isSuccess]);

  React.useEffect(() => {
    resetTimer();
  }, []);

  React.useEffect(() => {
    countRecords();
  }, [countRecords]);

  if (isLoading) {
    return <InfoPage message="Загружаю..." />;
  }

  if (isSuccess && data?.records.length === 0) {
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
            className={` grid  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6  grid-rows-12 gap-2  overflow-hidden  w-full
                ${
                  scrolling &&
                  recordsCount > notScrollingCardsQuantity &&
                  'animate-[slide1_15s_linear_infinite] absolute top-0 w-full'
                }
                `}
          >
            {isSuccess &&
              data?.records &&
              data.records.map((item) => <SummaryCard {...item} key={`card_${item.id}`} />)}
          </div>
          <div
            className={` card-anim grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 grid-rows-12 gap-2 overflow-hidden absolute top-0 w-full pb-2                
                 ${
                   scrolling
                     ? recordsCount > notScrollingCardsQuantity
                       ? 'animate-[slide2_15s_linear_infinite]'
                       : 'invisible'
                     : 'invisible'
                 }
                `}
          >
            {isSuccess &&
              data?.records &&
              data.records.map((item) => <SummaryCard {...item} key={`inv_card_${item.id}`} />)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
