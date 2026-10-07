import { THistoryStatus } from '@repo/schemas';

interface IRecordCardConfig {
  bg: string;
  text: string;
  stateColor?: string;
}

export const RECORD_CARD_CONFIG: Record<THistoryStatus | 'null', IRecordCardConfig> = {
  // 1. Брак продукта / Брак основы (Красный фон, белый текст)
  product_fail: {
    bg: 'bg-record-card-fail border-transparent',
    text: 'text-record-card-bright-fg',
  },
  base_fail: {
    bg: 'bg-record-card-base border-transparent',
    text: 'text-record-card-base-fg',
    stateColor: 'text-record-card-base-badge-fail',
  },

  // 2. В процессе (Синий фон, белый текст)
  product_in_progress: {
    bg: 'bg-record-card-process border-transparent',
    text: 'text-record-card-bright-fg',
  },

  // 3. Фасовка завершена (Оранжевый фон, белый текст)
  product_finished: {
    bg: 'bg-record-card-finished border-transparent',
    text: 'text-record-card-bright-fg',
  },

  // 4. Проверки продукта (Желто-оранжевый фон, белый текст)
  product_check: {
    bg: 'bg-record-card-wait border-transparent',
    text: 'text-record-card-bright-fg',
  },
  product_correct: {
    bg: 'bg-record-card-wait border-transparent',
    text: 'text-record-card-bright-fg',
  },

  // 5. Успешные допуски (Зеленый фон, белый текст)
  product_pass: {
    bg: 'bg-record-card-success border-transparent',
    text: 'text-record-card-bright-fg',
  },

  // 6. Базовые серые карточки (Серый фон, темный текст, цветная подпись статуса)
  plug_pass: {
    bg: 'bg-record-card-base border-transparent',
    text: 'text-record-card-base-fg',
    stateColor: 'text-record-card-base-badge-success',
  },
  base_check: {
    bg: 'bg-record-card-base border-transparent',
    text: 'text-record-card-base-fg',
    stateColor: 'text-record-card-base-badge-wait',
  },
  base_correct: {
    bg: 'bg-record-card-base border-transparent',
    text: 'text-record-card-base-fg',

    stateColor: 'text-record-card-base-badge-wait',
  },
  base_continue: {
    bg: 'bg-record-card-base border-transparent',
    text: 'text-record-card-base-fg',
    stateColor: 'text-record-card-base-badge-wait',
  },

  null: {
    bg: 'bg-card border border-neutral-950/10 dark:border-neutral-800',
    text: 'text-record-card-undefined-fg',
  },
};
