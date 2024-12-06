import React from "react";
import { useRecords } from "../../use-records";
import RowComponent from "./row-component";
import { useSearchParams } from "react-router";

import CardComponent from "./card-component";
import { usePlants } from "../../use-plants";
import { IPlant } from "../../plant-service";

function PlantNotFoundComponent() {
  return (
    <div className=" h-dvh bg-gray-950 overflow-hidden flex flex-col justify-center">
      <div className="text-slate-50 text-5xl flex m-auto text-center p-4">{`Площадка  в строке поиска...`}</div>
    </div>
  );
}

function NotSearchParmsComponent() {
  return (
    <div className=" h-dvh bg-gray-950 overflow-hidden flex flex-col justify-center">
      <div className="text-slate-50 text-5xl flex m-auto text-center p-4">
        Отсутствует выбор площадки в строке поиска...
      </div>
    </div>
  );
}

function SummaryView(plant: IPlant) {
  const [cardsView, setCardsView] = React.useState(false);
  const [scrolling, setScrolling] = React.useState(false);
  const scrollDelay = 30000;
  const interval = React.useRef(scrollDelay);

  const { data, isSuccess } = useRecords(plant.id);

  const resetTimer = () => {
    setScrolling(false);
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      if (isSuccess && data.records && (cardsView ? data.records.length > 42 : data.records.length > 14)) {
        setScrolling(true);
      }
    }, scrollDelay);
    return () => clearInterval(interval.current);
  };

  React.useEffect(() => {
    resetTimer();
  }, [data]);

  if (isSuccess && data.records.length === 0) {
    return (
      <div className=" h-dvh bg-gray-950 overflow-hidden flex flex-col justify-center">
        <div className="text-slate-50 text-5xl flex m-auto text-center p-4">Записей не найдено...</div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div
        className=" h-dvh bg-gray-950 overflow-hidden py-2"
        onTouchMove={() => resetTimer()}
        onMouseMove={() => resetTimer()}
        onScroll={() => resetTimer()}
      >
        <div
          // className="absolute bottom-5 right-5 rounded-full w-24 h-24 z-50 flex items-center justify-center bg-slate-100 text-slate-500"
          className="absolute bottom-5 right-5 rounded-full w-24 h-24 z-50 flex items-center justify-center
        text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium "
          // bg-slate-100 text-slate-500"
          onClick={() => {
            setCardsView(!cardsView);
            resetTimer();
          }}
        >
          {cardsView ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>
          )}
        </div>
        <div className="overflow-y-auto h-full   scrollbar-none">
          {cardsView ? (
            <>
              <div
                className={`grid  md:grid-cols-4 md:grid-rows-12 lg:grid-cols-3 lg:grid-rows-12 gap-2  overflow-hidden pb-2
          ${scrolling && "animate-[slide1_45s_linear_infinite] absolute top-0 w-full"}
          `}
              >
                {isSuccess &&
                  data.records &&
                  data.records.map((item) => <CardComponent {...item} key={`card_${item.id}`} />)}
              </div>
              <div
                className={`grid md:grid-cols-4 md:grid-row-12 lg:grid-cols-3 lg:grid-rows-10 gap-2 overflow-hidden absolute top-0 w-full pb-2 ${
                  scrolling ? "animate-[slide2_45s_linear_infinite]" : "invisible"
                }`}
              >
                {isSuccess &&
                  data.records &&
                  data.records.map((item) => <CardComponent {...item} key={`card_${item.id}`} />)}
              </div>
            </>
          ) : (
            <div>
              <div
                className={`grid  grid-cols-1 grid-rows-12 gap-2  overflow-hidden pb-2
          ${scrolling && "animate-[slide1_45s_linear_infinite] absolute top-0 w-full"}
          `}
              >
                {isSuccess &&
                  data.records &&
                  data.records.map((item) => <RowComponent {...item} key={`row_${item.id}`} />)}
              </div>
              <div
                className={`grid grid-cols-1grid-row-12 gap-2 overflow-hidden absolute top-0 w-full pb-2 ${
                  scrolling ? "animate-[slide2_45s_linear_infinite]" : "invisible"
                }`}
              >
                {isSuccess &&
                  data.records &&
                  data.records.map((item) => <RowComponent {...item} key={`inv_row_${item.id}`} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default function Summary() {
  let [searchParams] = useSearchParams();
  const plant = searchParams.get("plant");
  const { data, isSuccess } = usePlants(plant);

  if (!data) {
    return <PlantNotFoundComponent />;
  }

  if (plant === null) {
    return <NotSearchParmsComponent />;
  }

  return <React.Fragment>{isSuccess && <SummaryView {...data} />}</React.Fragment>;
}
