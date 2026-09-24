import { THistoryMutationContextProps } from '@/entities/history';

export type TCancelHistoryButtonUiProps = THistoryMutationContextProps & {
  onClose?: () => void;
};
