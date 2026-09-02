import React from 'react';
import { TPlantByValueOutput } from '@repo/schemas';
import { InfoPage } from '@/shared/ui';
import { SummaryCard } from '@/entities/summary';
import { useAppSummaryViewAnimation } from '../model';

export function AppSummaryView(plant: TPlantByValueOutput) {
  const { data, isSuccess, isLoading, scrolling, isAnimationNeeded, isDocNotFound, resetTimer } =
    useAppSummaryViewAnimation({ plantId: plant.id });

  if (isLoading) {
    return null;
  }

  if (isDocNotFound || (isSuccess && (!data?.records || data.records.length === 0))) {
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
                  isAnimationNeeded &&
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
                     ? isAnimationNeeded
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
