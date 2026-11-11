import { TCanState } from '@repo/schemas';

interface ICanStateConfig {
  text: string;
}

export const CAN_STATE_CONFIG: Record<TCanState | 'null', ICanStateConfig> = {
  can_from_product: {
    text: 'text-can-card-from-product',
  },
  can_washed: {
    text: 'text-can-card-washed',
  },
  can_ready: {
    text: 'text-can-card-ready',
  },
  can_carantine: {
    text: 'text-can-card-carantine',
  },
  can_desinfected: {
    text: 'text-can-card-desinfected',
  },
  can_need_wash: {
    text: 'text-can-card-need-wash',
  },
  can_correct: {
    text: 'text-can-card-correct',
  },
  null: {
    text: 'text-record-card-undefined',
  },
};
