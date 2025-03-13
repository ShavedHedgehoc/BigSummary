import { useShallow } from "zustand/react/shallow";
import { useBoilsPaginationStore } from "./store/use-boils-pagination-store";
import DoubleArrowLeftIcon from "../../shared/components/icons/double-arrow-left-icon";
import ArrowLeftIcon from "../../shared/components/icons/arrow-left-icon";
import DoubleArrowRightIcon from "../../shared/components/icons/double-arrow-right-icon";
import ArrowRightIcon from "../../shared/components/icons/arrow-rigth-icon";
import clsx from "clsx";

export default function BoilsPagination() {
  const page = useBoilsPaginationStore(useShallow((state) => state.page));
  const total = useBoilsPaginationStore(useShallow((state) => state.total));
  const limit = useBoilsPaginationStore(useShallow((state) => state.limit));
  const increasePage = useBoilsPaginationStore(useShallow((state) => state.increasePage));
  const decreasePage = useBoilsPaginationStore(useShallow((state) => state.decreasePage));
  const setPage = useBoilsPaginationStore(useShallow((state) => state.setPage));
  const pages = Math.ceil(total / limit);

  const decreaseButtonsDisabled = page === 1 || total === 0;
  const increaseButtonsDisabled = page === pages || pages === 0;

  const handleFirstButtonClick = () => {
    if (!decreaseButtonsDisabled) {
      setPage(1);
    }
  };

  const handleDecreaseButtonClick = () => {
    if (!decreaseButtonsDisabled) {
      decreasePage();
    }
  };

  const handleIncreaseButtonClick = () => {
    if (!increaseButtonsDisabled) {
      increasePage();
    }
  };

  const handleLastButtonClick = () => {
    if (!increaseButtonsDisabled) {
      setPage(pages);
    }
  };

  return (
    <div className="flex flex-row justify-between bg-gray-950 px-3 py-3 rounded-xl gap-1 text-slate-300">
      <div
        className={clsx(
          "flex py-6 px-6 bg-gray-900 rounded-md justify-center items-center ",
          decreaseButtonsDisabled && "text-slate-700"
        )}
        onClick={() => handleFirstButtonClick()}
      >
        <DoubleArrowLeftIcon size={12} />
      </div>
      <div
        className={clsx(
          "flex py-6 px-6 bg-gray-900 rounded-md justify-center items-center ",
          decreaseButtonsDisabled && "text-slate-700"
        )}
        onClick={() => handleDecreaseButtonClick()}
      >
        <ArrowLeftIcon size={12} />
      </div>
      <div className="flex flex-row flex-grow py-4 px-6 bg-gray-900 rounded-md justify-center items-center text-3xl">{`Страница ${
        pages === 0 ? 0 : page
      } из ${pages}`}</div>
      <div
        className={clsx(
          "flex py-6 px-6 bg-gray-900 rounded-md justify-center items-center ",
          increaseButtonsDisabled && "text-slate-700"
        )}
        onClick={() => handleIncreaseButtonClick()}
      >
        <ArrowRightIcon size={12} />
      </div>
      <div
        className={clsx(
          "flex py-6 px-6 bg-gray-900 rounded-md justify-center items-center ",
          increaseButtonsDisabled && "text-slate-700"
        )}
        onClick={() => handleLastButtonClick()}
      >
        <DoubleArrowRightIcon size={12} />
      </div>
    </div>
  );
}
