import { ToggleTheme } from '@/features/theme';
import { useRouteTitle } from '@/shared/lib';
import { SidebarTrigger, Separator } from '@/shared/ui';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/shared/ui';
import React from 'react';

export function AppHeader() {
  const titles = useRouteTitle();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 mt-1 data-[orientation=vertical]:h-7 " />
        <Breadcrumb>
          <BreadcrumbList>
            {titles.map((title, index) => {
              return (
                <React.Fragment key={title}>
                  {index > 0 && (
                    <BreadcrumbSeparator className="text-muted-foreground dark:text-muted-foreground/50" />
                  )}
                  <BreadcrumbItem>
                    <span className="text-xs font-normal text-muted-foreground dark:text-muted-foreground/50">
                      {title}
                    </span>
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
