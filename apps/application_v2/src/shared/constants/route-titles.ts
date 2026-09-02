import { ROUTE_PATH } from './routes';

export const STATIC_TITLES: Record<string, string> = {
  [ROUTE_PATH.DASH]: 'Текущая сводка',
  [ROUTE_PATH.FORBIDDEN]: 'Доступ запрещен',
  [ROUTE_PATH.PLANNER]: 'Планировщик',
  [ROUTE_PATH.PLANNER_SUMMARIES]: 'Список сводок',
  [ROUTE_PATH.PLANNER_SUMMARY_UPLOAD]: 'Загрузка сводок',
  [ROUTE_PATH.PLANNER_CONVEYORS]: 'Конвейеры',
  [ROUTE_PATH.LAB]: 'Лаборатория',
  [ROUTE_PATH.LAB_BOILS]: 'Основы',
  [ROUTE_PATH.LAB_PRODUCTS]: 'Продукты',
  [ROUTE_PATH.TECH]: 'Технолог',
  [ROUTE_PATH.TECH_CANS_DASH]: 'Емкости',
  [ROUTE_PATH.TECH_CANS_LIST]: 'Список емкостей',
  [ROUTE_PATH.TECH_CANS_LOCATION]: 'Местоположение емкостей',
  [ROUTE_PATH.WEIGHT_SECTION]: 'Весовой участок',
  [ROUTE_PATH.WEIGHT_SECTION_INVENTORIES]: 'Переучеты',
  [ROUTE_PATH.WEIGHT_SECTION_WEIGHT_REPORTS]: 'Отчет по взвешиваниям',
  [ROUTE_PATH.WEIGHT_SECTION_PRODUCTIVITY]: 'Выработка',
  [ROUTE_PATH.WEIGHT_SECTION_BOILS_UPLOAD]: 'Загрузка варок',
  [ROUTE_PATH.FOREMAN]: 'Мастер',
  [ROUTE_PATH.REPORTS]: 'Отчеты',
  [ROUTE_PATH.REPORTS_TIMING]: 'Тайминг сводок',
  [ROUTE_PATH.REPORTS_BOILS]: 'Основы',
  [ROUTE_PATH.EMPLOYEES]: 'Сотрудники',
  [ROUTE_PATH.ADMIN]: 'Администратор',
  [ROUTE_PATH.ADMIN_USERS]: 'Пользователи',
};

export const DYNAMIC_PATTERNS = [
  { path: 'boil-detail/:boilId', title: 'Информация по варке' },
  { path: 'lot-detail/:lotId', title: 'Информация по квазипартии' },
];
