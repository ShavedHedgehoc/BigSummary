import { THistoryStatus } from '@repo/schemas';

export const DB_HISTORY_STATUSES: Record<string, THistoryStatus> = {
  BASE_FAIL: 'base_fail',
  PRODUCT_FAIL: 'product_fail',
  BASE_CHECK: 'base_check',
  PRODUCT_CHECK: 'product_check',
  PRODUCT_CORRECT: 'product_correct',
  PRODUCT_IN_PROGRESS: 'product_in_progress',
  BASE_CORRECT: 'base_correct',
  PLUG_PASS: 'plug_pass',
  PRODUCT_PASS: 'product_pass',
  PRODUCT_FINISHED: 'product_finished',
  BASE_CONTINUE: 'base_continue',
} as const;
