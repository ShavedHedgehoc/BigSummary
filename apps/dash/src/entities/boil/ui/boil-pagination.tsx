import clsx from 'clsx';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@/shared/ui';
import { useBoilPagination } from '../model';

export function BoilPagination() {
  const {
    page,
    pages,
    increaseButtonsDisabled,
    decreaseButtonsDisabled,
    handleFirstButtonClick,
    handleDecreaseButtonClick,
    handleIncreaseButtonClick,
    handleLastButtonClick,
  } = useBoilPagination();

  return (
    <div className="flex flex-row justify-between bg-gray-950 px-3 py-3 rounded-xl gap-1 text-slate-300">
      <div
        className={clsx(
          'flex py-6 px-6 bg-gray-900 rounded-md justify-center items-center ',
          decreaseButtonsDisabled && 'text-slate-700',
        )}
        onClick={() => handleFirstButtonClick()}
      >
        <DoubleArrowLeftIcon size={12} />
      </div>
      <div
        className={clsx(
          'flex py-6 px-6 bg-gray-900 rounded-md justify-center items-center ',
          decreaseButtonsDisabled && 'text-slate-700',
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
          'flex py-6 px-6 bg-gray-900 rounded-md justify-center items-center ',
          increaseButtonsDisabled && 'text-slate-700',
        )}
        onClick={() => handleIncreaseButtonClick()}
      >
        <ArrowRightIcon size={12} />
      </div>
      <div
        className={clsx(
          'flex py-6 px-6 bg-gray-900 rounded-md justify-center items-center ',
          increaseButtonsDisabled && 'text-slate-700',
        )}
        onClick={() => handleLastButtonClick()}
      >
        <DoubleArrowRightIcon size={12} />
      </div>
    </div>
  );
}
