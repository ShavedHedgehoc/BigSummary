import { THistoryMutationContextProps } from '@/entities/history';

export type TChangeStateFormUiProps = THistoryMutationContextProps & {
  onClose?: () => void;
};
