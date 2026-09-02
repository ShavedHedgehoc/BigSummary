import React from 'react';
import { TPlantByValueOutput } from '@repo/schemas';
import { useSummaryViewAnimation } from '../model';
import { CardIcon, EyeHideIcon, EyeIcon, InfoPage, ListIcon } from '@/shared/ui';
import { SummaryCard, SummaryRow } from '@/entities/summary';

export function SummaryView(plant: TPlantByValueOutput) {
  const {
    data,
    isSuccess,
    isLoading,
    scrolling,
    hideFinished,
    cardsView,
    recordsCount,
    activeRecordsCount,
    notScrollingCardsQuantity,
    notScrollingRowsQuantity,
    resetTimer,
    switchCardsView,
    switchHide,
    isDocNotFound,
  } = useSummaryViewAnimation({ plantId: plant.id });

  if (isLoading) {
    return null;
  }

  if (isDocNotFound || (isSuccess && (!data?.records || data.records.length === 0))) {
    return <InfoPage message="Записей не найдено..." />;
  }

  return (
    <React.Fragment>
      <div
        className=" h-dvh bg-gray-950 overflow-hidden py-2"
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
        <div
          className="absolute bottom-8 right-6 rounded-full w-24 h-24 z-50 flex items-center justify-center
        text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium "
          onClick={() => switchCardsView()}
        >
          {cardsView ? <ListIcon /> : <CardIcon />}
        </div>

        <div
          className="absolute bottom-36 right-6 rounded-full w-24 h-24 z-50 flex items-center justify-center
        text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium "
          onClick={() => switchHide()}
        >
          {hideFinished ? <EyeIcon /> : <EyeHideIcon />}
        </div>

        <div className="overflow-y-auto h-full   scrollbar-none">
          {cardsView && (
            <>
              <div
                className={` grid  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6  grid-rows-14 gap-2  overflow-hidden pb-2 w-full
                ${
                  scrolling &&
                  !hideFinished &&
                  recordsCount > notScrollingCardsQuantity &&
                  'animate-[slide1_15s_linear_infinite] absolute top-0 w-full'
                }
                ${
                  scrolling &&
                  hideFinished &&
                  activeRecordsCount > notScrollingCardsQuantity &&
                  'animate-[slide1_15s_linear_infinite] absolute top-0 w-full'
                }`}
              >
                {isSuccess &&
                  data?.records &&
                  hideFinished &&
                  data.records.map(
                    (item) =>
                      item.stateValue !== 'product_finished' && (
                        <SummaryCard {...item} key={`card_${item.id}`} />
                      ),
                  )}
                {isSuccess &&
                  data?.records &&
                  !hideFinished &&
                  data.records.map((item) => <SummaryCard {...item} key={`card_${item.id}`} />)}
              </div>
              <div
                className={` card-anim grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 grid-rows-14 gap-2 overflow-hidden absolute top-0 w-full pb-2                
                 ${
                   scrolling
                     ? hideFinished
                       ? activeRecordsCount > notScrollingCardsQuantity
                         ? 'animate-[slide2_15s_linear_infinite]'
                         : 'invisible'
                       : recordsCount > notScrollingCardsQuantity
                         ? 'animate-[slide2_15s_linear_infinite]'
                         : 'invisible'
                     : 'invisible'
                 }
                `}
              >
                {data?.records &&
                  hideFinished &&
                  data.records.map(
                    (item) =>
                      item.stateValue !== 'product_finished' && (
                        <SummaryCard {...item} key={`inv_card_${item.id}`} />
                      ),
                  )}
                {data?.records &&
                  !hideFinished &&
                  data.records.map((item) => <SummaryCard {...item} key={`inv_card_${item.id}`} />)}
              </div>
            </>
          )}
          {!cardsView && (
            <>
              <div
                className={`grid  grid-cols-1 grid-rows-14 gap-2  overflow-hidden pb-2
                ${
                  scrolling &&
                  !hideFinished &&
                  recordsCount > notScrollingRowsQuantity &&
                  'animate-[slide1_45s_linear_infinite] absolute top-0 w-full'
                }
                ${
                  scrolling &&
                  hideFinished &&
                  activeRecordsCount > notScrollingRowsQuantity &&
                  'animate-[slide1_45s_linear_infinite] absolute top-0 w-full'
                }`}
              >
                {data?.records &&
                  hideFinished &&
                  data.records.map(
                    (item) =>
                      item.stateValue !== 'product_finished' && (
                        <SummaryRow {...item} key={`row_${item.id}`} />
                      ),
                  )}
                {data?.records &&
                  !hideFinished &&
                  data.records.map((item) => <SummaryRow {...item} key={`row_${item.id}`} />)}
              </div>

              <div
                className={`grid grid-cols-1 grid-row-14  gap-2 overflow-hidden absolute top-0 w-full pb-2                
                 ${
                   scrolling
                     ? hideFinished
                       ? activeRecordsCount > notScrollingRowsQuantity
                         ? 'animate-[slide2_45s_linear_infinite]'
                         : 'invisible'
                       : recordsCount > notScrollingRowsQuantity
                         ? 'animate-[slide2_45s_linear_infinite]'
                         : 'invisible'
                     : 'invisible'
                 }`}
              >
                {data?.records &&
                  hideFinished &&
                  data.records.map(
                    (item) =>
                      item.stateValue !== 'product_finished' && (
                        <SummaryRow {...item} key={`inv_row_${item.id}`} />
                      ),
                  )}
                {data?.records &&
                  !hideFinished &&
                  data.records.map((item) => <SummaryRow {...item} key={`inv_row_${item.id}`} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
