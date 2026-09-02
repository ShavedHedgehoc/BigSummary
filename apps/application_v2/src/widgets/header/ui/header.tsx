// import { ToggleTheme } from '@/features/theme';
// import { useRouteTitle } from '@/shared/lib';
// import { SidebarTrigger, Separator } from '@/shared/ui';
// import { SquareChevronRight } from 'lucide-react';

// export function AppHeader() {
//   const titles = useRouteTitle();
//   return (
//     <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
//       <div className="flex w-full items-center  gap-1 px-4 lg:gap-2 lg:px-6">
//         <SidebarTrigger className="-ml-1" />
//         <Separator orientation="vertical" className=" mx-2 mt-1 data-[orientation=vertical]:h-7" />
//         {titles.length === 1
//           ? <h1 className="text-base font-medium">{titles[0]}</h1>
//           : <span><h1 className="text-base font-medium">{titles[0]}</h1><SquareChevronRight /><h1 className="text-base font-medium">{titles[1]}</h1></span>
//         }
//         <div className="ml-auto flex items-center gap-2">
//           <ToggleTheme />
//         </div>
//       </div>
//     </header>
//   );
// }
import { ToggleTheme } from '@/features/theme';
import { useRouteTitle } from '@/shared/lib';
import { SidebarTrigger, Separator } from '@/shared/ui';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui'; // Укажите ваш точный путь к компонентам shadcn
import React from 'react';

export function AppHeader() {
  const titles = useRouteTitle();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 mt-1 data-[orientation=vertical]:h-7" />

        {/* Интеграция Breadcrumb от shadcn/ui */}
        <Breadcrumb>
          <BreadcrumbList>
            {titles.map((title, index) => {
              const isLast = index === titles.length - 1;

              return (
                <React.Fragment key={title}>
                  {/* Разделитель между элементами (не показывается перед первым) */}
                  {index > 0 && <BreadcrumbSeparator />}

                  <BreadcrumbItem>
                    {isLast ? (
                      // Текущая активная страница (последний элемент массива)
                      <BreadcrumbPage className="text-base font-medium text-foreground">
                        {title}
                      </BreadcrumbPage>
                    ) : (
                      // Предыдущие уровни вложенности
                      <span className="text-base font-normal text-muted-foreground">{title}</span>
                    )}
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
