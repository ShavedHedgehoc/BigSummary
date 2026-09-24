import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/shared/ui';
import { HedgehogIcon } from '@/shared/assets';

import { NavUser } from './nav-user';
import { NavMain } from './nav-main';
import {
  adminNavItems,
  employeeNavItems,
  foremanNavItems,
  labNavItems,
  mainNavItems,
  plannerNavItems,
  reportsNavItems,
  technologistNavItems,
  weighSectionNavItems,
} from './items';
import { useAuth } from '@/entities/user';
import { NavWithSubs } from './nav-with-subs';
import { Atom, ChartBar, Cog, FlaskConical, Pickaxe, SquareChartGantt } from 'lucide-react';
import { DB_ROLES, ROUTE_PATH, STATIC_TITLES } from '@/shared/constants';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="#">
                <HedgehogIcon className="size-5!  text-foreground dark:text-foreground" />
                <span className="text-base font-semibold text-foreground dark:text-foreground">
                  Электросводка 2.0
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={mainNavItems} />
        <NavWithSubs
          header={STATIC_TITLES[ROUTE_PATH.PLANNER]}
          icon={<SquareChartGantt />}
          items={plannerNavItems}
        />
        <NavWithSubs
          header={STATIC_TITLES[ROUTE_PATH.LAB]}
          icon={<FlaskConical />}
          items={labNavItems}
        />
        <NavWithSubs
          header={STATIC_TITLES[ROUTE_PATH.TECH]}
          icon={<Atom />}
          items={technologistNavItems}
        />
        <NavWithSubs
          header={STATIC_TITLES[ROUTE_PATH.WEIGHT_SECTION]}
          icon={<Pickaxe />}
          items={weighSectionNavItems}
        />
        <NavMain items={foremanNavItems} />
        <NavWithSubs
          header={STATIC_TITLES[ROUTE_PATH.REPORTS]}
          icon={<ChartBar />}
          items={reportsNavItems}
        />
        <NavMain items={employeeNavItems} />
        {user.roles.includes(DB_ROLES.ADMIN) && (
          <NavWithSubs
            header={STATIC_TITLES[ROUTE_PATH.ADMIN]}
            icon={<Cog />}
            items={adminNavItems}
          />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
