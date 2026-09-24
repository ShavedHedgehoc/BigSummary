import { ROUTE_PATH, STATIC_TITLES } from '@/shared/constants';
import { Factory, House, Users } from 'lucide-react';

export interface TNavItem {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

export const mainNavItems: TNavItem[] = [
  {
    title: STATIC_TITLES[ROUTE_PATH.DASH],
    icon: <House />,
    url: ROUTE_PATH.DASH,
  },
];

export const plannerNavItems: TNavItem[] = [
  {
    title: STATIC_TITLES[ROUTE_PATH.PLANNER_SUMMARIES],
    url: ROUTE_PATH.PLANNER_SUMMARIES,
  },
  {
    title: STATIC_TITLES[ROUTE_PATH.PLANNER_CONVEYORS],
    url: ROUTE_PATH.PLANNER_CONVEYORS,
  },
];

export const labNavItems: TNavItem[] = [
  {
    title: STATIC_TITLES[ROUTE_PATH.LAB_BOILS],
    url: ROUTE_PATH.LAB_BOILS,
  },
  {
    title: STATIC_TITLES[ROUTE_PATH.LAB_PRODUCTS],
    url: ROUTE_PATH.LAB_PRODUCTS,
  },
];

export const technologistNavItems: TNavItem[] = [
  {
    title: STATIC_TITLES[ROUTE_PATH.TECH_CANS_DASH],
    url: ROUTE_PATH.TECH_CANS_DASH,
  },
  {
    title: STATIC_TITLES[ROUTE_PATH.TECH_CANS_LIST],
    url: ROUTE_PATH.TECH_CANS_LIST,
  },
  {
    title: STATIC_TITLES[ROUTE_PATH.TECH_CANS_LOCATION],
    url: ROUTE_PATH.TECH_CANS_LOCATION,
  },
];

export const weighSectionNavItems: TNavItem[] = [
  {
    title: STATIC_TITLES[ROUTE_PATH.WEIGHT_SECTION_INVENTORIES],
    url: ROUTE_PATH.WEIGHT_SECTION_INVENTORIES,
  },
  {
    title: STATIC_TITLES[ROUTE_PATH.WEIGHT_SECTION_WEIGHT_REPORTS],
    url: ROUTE_PATH.WEIGHT_SECTION_WEIGHT_REPORTS,
  },
  {
    title: STATIC_TITLES[ROUTE_PATH.WEIGHT_SECTION_PRODUCTIVITY],
    url: ROUTE_PATH.WEIGHT_SECTION_PRODUCTIVITY,
  },
  {
    title: STATIC_TITLES[ROUTE_PATH.WEIGHT_SECTION_BOILS_UPLOAD],
    url: ROUTE_PATH.WEIGHT_SECTION_BOILS_UPLOAD,
  },
];

export const foremanNavItems: TNavItem[] = [
  {
    title: STATIC_TITLES[ROUTE_PATH.FOREMAN],
    icon: <Factory />,
    url: ROUTE_PATH.FOREMAN,
  },
];

export const reportsNavItems: TNavItem[] = [
  {
    title: STATIC_TITLES[ROUTE_PATH.REPORTS_TIMING],
    url: ROUTE_PATH.REPORTS_TIMING,
  },
  {
    title: STATIC_TITLES[ROUTE_PATH.REPORTS_BOILS],
    url: ROUTE_PATH.REPORTS_BOILS,
  },
];

export const employeeNavItems: TNavItem[] = [
  {
    title: STATIC_TITLES[ROUTE_PATH.EMPLOYEES],
    icon: <Users />,
    url: ROUTE_PATH.EMPLOYEES,
  },
];

export const adminNavItems: TNavItem[] = [
  {
    title: STATIC_TITLES[ROUTE_PATH.ADMIN_USERS],
    url: ROUTE_PATH.ADMIN_USERS,
  },
];
