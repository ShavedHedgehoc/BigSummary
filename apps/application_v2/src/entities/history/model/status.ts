import { THistoryStatus } from '@repo/schemas';
import {
  CheckCircle2Icon,
  Hourglass,
  Loader2,
  ShieldCheck,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';

type TOutputStatus =
  'fail' | 'wait' | 'need_correct' | 'success' | 'success_pass' | 'progress' | 'undefined';

export interface IStateStyle {
  color: string;
  bg: string;
  iconColor: string;
  icon: LucideIcon;
}

const STATUS_STYLES: Record<TOutputStatus, IStateStyle> = {
  fail: {
    color: 'text-status-fail',
    bg: 'bg-status-fail/10 text-status-fail border-status-fail/20',
    iconColor: 'text-status-fail-icon',
    icon: TriangleAlert,
  },
  wait: {
    color: 'text-status-wait',
    bg: 'bg-status-wait/10 text-status-wait border-status-wait/20',
    iconColor: 'text-status-wait-icon',
    icon: Hourglass,
  },
  need_correct: {
    color: 'text-status-wait',
    bg: 'bg-status-wait/10 text-status-wait border-status-wait/20',
    iconColor: 'text-status-wait-icon',
    icon: TriangleAlert,
  },
  success: {
    color: 'text-status-success',
    bg: 'bg-status-success/10 text-status-success border-status-success/20',
    iconColor: 'text-status-success-icon',
    icon: CheckCircle2Icon,
  },
  success_pass: {
    color: 'text-status-success',
    bg: 'bg-status-success/10 text-status-success border-status-success/20',
    iconColor: 'text-status-success-icon',
    icon: ShieldCheck,
  },
  progress: {
    color: 'text-status-progress',
    bg: 'bg-status-progress/10 text-status-progress border-status-progress/20',
    iconColor: 'text-status-progress-icon',
    icon: Loader2,
  },
  undefined: {
    color: 'text-status-undefined',
    bg: 'bg-status-undefined/10 text-status-undefined border-status-undefined/20',
    iconColor: 'text-status-undefined-icon',
    icon: Hourglass,
  },
};

const STATUS_MAP: Record<THistoryStatus, TOutputStatus> = {
  base_fail: 'fail',
  product_fail: 'fail',
  base_check: 'wait',
  product_check: 'wait',
  product_correct: 'need_correct',
  base_correct: 'need_correct',
  product_in_progress: 'progress',
  product_finished: 'success',
  plug_pass: 'success_pass',
  product_pass: 'success_pass',
  base_continue: 'success_pass',
};

function isInputStatus(status: unknown): status is THistoryStatus {
  return typeof status === 'string' && status in STATUS_MAP;
}

function getCommonState(state: THistoryStatus | null | string): TOutputStatus {
  if (!state || !isInputStatus(state)) {
    return 'undefined';
  }
  return STATUS_MAP[state];
}

export function getStatusConfig(state: THistoryStatus | null | string): IStateStyle {
  const commonState = getCommonState(state);
  return STATUS_STYLES[commonState];
}
