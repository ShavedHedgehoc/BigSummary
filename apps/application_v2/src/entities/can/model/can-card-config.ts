import { TCanState } from '@repo/schemas';

interface ICanCardConfig {
  bg: string;
  text: string;
  stateColor?: string; // Опциональное поле, если нужно отдельно подкрасить бейдж/иконку статуса
}

export const CAN_CARD_CONFIG: Record<TCanState | 'null', ICanCardConfig> = {
  // 1. Брак продукта / Брак основы (Мягкий серый фон по вашему CSS)
  can_from_product: {
    bg: 'bg-can-card-from-product border-transparent',
    text: 'text-can-card-from-product-foreground', // Исправлена опечатка в porduct
  },

  // 2. Мытая (Голубой фон)
  can_washed: {
    bg: 'bg-can-card-washed border-transparent',
    text: 'text-can-card-washed-foreground',
  },

  // 3. Готова (Зеленый фон)
  can_ready: {
    bg: 'bg-can-card-ready border-transparent',
    text: 'text-can-card-ready-foreground',
  },

  // 4. Карантин (Красный фон)
  can_carantine: {
    bg: 'bg-can-card-carantine border-transparent',
    text: 'text-can-card-carantine-foreground',
  },

  // 5. Дезинфицирована (Фиолетовый/Фуксия фон)
  can_desinfected: {
    bg: 'bg-can-card-desinfected border-transparent',
    text: 'text-can-card-desinfected-foreground',
  },

  // 6. Требует мойки (Коричневый фон)
  can_need_wash: {
    bg: 'bg-can-card-need-wash border-transparent',
    text: 'text-can-card-need-wash-foreground',
  },

  // 7. Корректировка (Желтый фон)
  can_correct: {
    bg: 'bg-can-card-correct border-transparent',
    text: 'text-can-card-correct-foreground',
  },

  // Дефолтное состояние, если статус равен null или не определен
  null: {
    bg: 'bg-card border border-neutral-950/10 dark:border-neutral-800',
    text: 'text-record-card-undefined-fg',
  },
};
