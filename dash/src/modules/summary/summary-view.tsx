import React from "react";
import { useRecords } from "../../use-records";
import { IPlant } from "../../plant-service";
import ListIcon from "../../shared/components/icons/list-icon";
import CardIcon from "../../shared/components/icons/card-icon";
import EyeIcon from "../../shared/components/icons/eye-icon";
import EyeHideIcon from "../../shared/components/icons/eye-hide-icon";
import InfoPage from "../../shared/components/info-page";
import SummaryRow from "./summary-row";
import SummaryCard from "./summary-card";

export default function SummaryView(plant: IPlant) {
  const notScrollingCardsQuantity = 42;
  const notScrollingRowsQuantity = 14;
  const scrollDelay = 30000;

  const [cardsView, setCardsView] = React.useState(true);
  const [hideFinished, setHideFinished] = React.useState(false);
  const [scrolling, setScrolling] = React.useState(false);
  const [recordsCount, setRecordsCount] = React.useState(0);
  const [activeRecordsCount, setActiveRecordsCount] = React.useState(0);

  const interval = React.useRef(scrollDelay);

  const { data, isSuccess } = useRecords(plant.id);

  const resetTimer = () => {
    setScrolling(false);
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setScrolling(true);
    }, scrollDelay);
    return () => clearInterval(interval.current);
  };

  const countRecords = () => {
    const activeRecord =
      isSuccess && data.records ? data.records.filter((x) => x.stateValue !== "product_finished") : [];
    setRecordsCount(isSuccess && data.records ? data.records.length : 0);
    setActiveRecordsCount(activeRecord.length);
  };

  const switchHide = () => {
    setHideFinished((prev) => !prev);
  };

  const switchCardsView = () => {
    setCardsView((prev) => !prev);
  };

  React.useEffect(() => {
    resetTimer();
  }, []);

  React.useEffect(() => {
    countRecords();
  }, [data]);

  if (isSuccess && data.records.length === 0) {
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
                className={` grid  grid-cols-3 grid-rows-14 gap-2  overflow-hidden pb-2 w-full
                ${
                  scrolling &&
                  !hideFinished &&
                  recordsCount > notScrollingCardsQuantity &&
                  "animate-[slide1_15s_linear_infinite] absolute top-0 w-full"
                }
                ${
                  scrolling &&
                  hideFinished &&
                  activeRecordsCount > notScrollingCardsQuantity &&
                  "animate-[slide1_15s_linear_infinite] absolute top-0 w-full"
                }`}
              >
                {isSuccess &&
                  data.records &&
                  hideFinished &&
                  data.records.map(
                    (item) =>
                      item.stateValue !== "product_finished" && <SummaryCard {...item} key={`card_${item.id}`} />
                  )}
                {isSuccess &&
                  data.records &&
                  !hideFinished &&
                  data.records.map((item) => <SummaryCard {...item} key={`card_${item.id}`} />)}
              </div>
              <div
                className={` card-anim grid grid-cols-3 rid-rows-14 gap-2 overflow-hidden absolute top-0 w-full pb-2                
                 ${
                   scrolling
                     ? hideFinished
                       ? activeRecordsCount > notScrollingCardsQuantity
                         ? "animate-[slide2_15s_linear_infinite]"
                         : "invisible"
                       : recordsCount > notScrollingCardsQuantity
                       ? "animate-[slide2_15s_linear_infinite]"
                       : "invisible"
                     : "invisible"
                 }
                `}
              >
                {isSuccess &&
                  data.records &&
                  hideFinished &&
                  data.records.map(
                    (item) =>
                      item.stateValue !== "product_finished" && <SummaryCard {...item} key={`inv_card_${item.id}`} />
                  )}
                {isSuccess &&
                  data.records &&
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
                  "animate-[slide1_45s_linear_infinite] absolute top-0 w-full"
                }
                ${
                  scrolling &&
                  hideFinished &&
                  activeRecordsCount > notScrollingRowsQuantity &&
                  "animate-[slide1_45s_linear_infinite] absolute top-0 w-full"
                }`}
              >
                {isSuccess &&
                  data.records &&
                  hideFinished &&
                  data.records.map(
                    (item) => item.stateValue !== "product_finished" && <SummaryRow {...item} key={`row_${item.id}`} />
                  )}
                {isSuccess &&
                  data.records &&
                  !hideFinished &&
                  data.records.map((item) => <SummaryRow {...item} key={`row_${item.id}`} />)}
              </div>

              <div
                className={`grid grid-cols-1 grid-row-14  gap-2 overflow-hidden absolute top-0 w-full pb-2                
                 ${
                   scrolling
                     ? hideFinished
                       ? activeRecordsCount > notScrollingRowsQuantity
                         ? "animate-[slide2_45s_linear_infinite]"
                         : "invisible"
                       : recordsCount > notScrollingRowsQuantity
                       ? "animate-[slide2_45s_linear_infinite]"
                       : "invisible"
                     : "invisible"
                 }`}
              >
                {isSuccess &&
                  data.records &&
                  hideFinished &&
                  data.records.map(
                    (item) =>
                      item.stateValue !== "product_finished" && <SummaryRow {...item} key={`inv_row_${item.id}`} />
                  )}
                {isSuccess &&
                  data.records &&
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
