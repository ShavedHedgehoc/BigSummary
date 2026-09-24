import { TApplicationBoilItem, TApplicationDocDetailRowItem } from '@repo/schemas';

type TBoilHistoryType = 'base_continue' | 'base_correct' | 'plug_pass' | 'base_fail' | 'base_check';
type TProductHistoryType = 'product_pass' | 'product_fail' | 'product_check';
type TForemanHistoryType = 'product_in_progress' | 'product_finished';
type TPlannerHistoryType = 'product_in_progress' | 'product_finished';

export type THistoryMutationContextProps =
  | {
      mode: 'planner';
      row: TApplicationDocDetailRowItem | null;
      onChange?: (value: TPlannerHistoryType) => void;
    }
  | {
      mode: 'upload_doc';
      row?: never;
      onChange?: never;
    }
  | {
      mode: 'laboratory_boils';
      row: TApplicationBoilItem | null;
      onChange?: (value: TBoilHistoryType) => void;
    }
  | {
      mode: 'laboratory_products';
      row: TApplicationDocDetailRowItem | null;
      onChange?: (value: TProductHistoryType) => void;
    }
  | {
      mode: 'foreman';
      row: TApplicationDocDetailRowItem | null;
      onChange?: (value: TForemanHistoryType) => void;
    };

export type THistorySidePanelContext = THistoryMutationContextProps & {
  onClose?: () => void;
};
