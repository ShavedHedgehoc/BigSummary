import React from 'react';
import { InfoPage } from '@/shared/ui';
import { useCanView } from '../model';
import { CanCard } from '@/entities/can';

export function CanView() {
  const {
    notScrollingCardsQuantity,
    scrolling,
    recordsCount,
    isLoading,
    isSuccess,
    data,
    resetTimer,
  } = useCanView();

  if (isLoading) {
    return null;
  }

  if (isSuccess && data?.length === 0) {
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
                  'animate-[slide1_15s_linear_infinite] absolute top-0 w-full'
                }
                `}
          >
            {isSuccess && data?.map((item) => <CanCard key={`Card_${item.id}`} item={item} />)}
          </div>
          <div
            className={` card-anim grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 grid-rows-14 gap-2 overflow-hidden absolute top-0 w-full pt-1                
                 ${
                   scrolling
                     ? recordsCount > notScrollingCardsQuantity
                       ? 'animate-[slide2_15s_linear_infinite]'
                       : 'invisible'
                     : 'invisible'
                 }
                `}
          >
            {isSuccess && data?.map((item) => <CanCard key={`Card_${item.id}`} item={item} />)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
