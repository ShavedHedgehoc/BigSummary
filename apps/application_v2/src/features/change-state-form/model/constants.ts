import { ChevronsRight, RefreshCw, Check, AlertTriangle } from 'lucide-react';

export const BOILS_OPTIONS = [
  {
    value: 'base_continue',
    label: 'ПРОДОЛЖЕНИЕ',
    icon: ChevronsRight,
    colorClass:
      'border-emerald-500/40 text-emerald-400 bg-emerald-500/5 border-emerald-400 text-emerald-400',
    iconColor: 'text-emerald-400',
  },
  {
    value: 'base_correct',
    label: 'КОРРЕКТИРОВКА',
    icon: AlertTriangle,
    colorClass: 'border-amber-500/40 text-amber-400 bg-amber-500/5 border-amber-400 text-amber-400',
    iconColor: 'text-amber-400',
  },
  {
    value: 'plug_pass',
    label: 'ДОПУСК НА ПОДКЛЮЧЕНИЕ',
    icon: Check,
    colorClass: 'border-teal-500/40 text-teal-400 bg-teal-500/5 border-teal-400 text-teal-400',
    iconColor: 'text-teal-400',
  },
  {
    value: 'base_fail',
    label: 'БРАК',
    icon: AlertTriangle,
    colorClass: 'border-rose-500/40 text-rose-400 bg-rose-500/5 border-rose-400 text-rose-400',
    iconColor: 'text-rose-400',
  },
] as const;

export const PRODUCTS_OPTIONS = [
  {
    value: 'product_pass',
    label: 'ДОПУСК',
    icon: Check,
    colorClass: 'border-teal-500/40 text-teal-400 bg-teal-500/5 border-teal-400 text-teal-400',
    iconColor: 'text-teal-400',
  },
  {
    value: 'product_correct',
    label: 'ДОРАБОТКА',
    icon: RefreshCw,
    colorClass: 'border-amber-500/40 text-amber-400 bg-amber-500/5 border-amber-400 text-amber-400',
    iconColor: 'text-amber-400',
  },
  {
    value: 'product_fail',
    label: 'БРАК',
    icon: AlertTriangle,
    colorClass: 'border-rose-500/40 text-rose-400 bg-rose-500/5 border-rose-400 text-rose-400',
    iconColor: 'text-rose-400',
  },
] as const;

export const FOREMAN_OPTIONS = [
  {
    value: 'product_in_progress',
    label: 'НАЧАТЬ ФАСОВКУ',
    icon: ChevronsRight,
    colorClass: 'border-amber-500/40 text-amber-400 bg-amber-500/5 border-amber-400 text-amber-400',
    iconColor: 'text-amber-400',
  },
  {
    value: 'product_finished',
    label: 'ЗАВЕРШИТЬ ФАСОВКУ',
    icon: Check,
    colorClass:
      'border-emerald-500/40 text-emerald-400 bg-emerald-500/5 border-emerald-400 text-emerald-400',
    iconColor: 'text-emerald-400',
  },
] as const;
