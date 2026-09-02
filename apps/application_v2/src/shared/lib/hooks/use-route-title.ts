// 'use client';

// import { usePathname } from 'next/navigation';
// import { STATIC_TITLES, DYNAMIC_PATTERNS } from '@/shared/constants';

// function matchNextPath(pattern: string, pathname: string): boolean {
//     const regexPattern = pattern
//         .replace(/\[\.\.\.[^\]]+\]/g, '.*') // Для catch-all роутов [...slug]
//         .replace(/\[[^\]]+\]/g, '[^/]+'); // Для обычных динамических параметров [id]

//     const regex = new RegExp(`^${regexPattern}$`);
//     return regex.test(pathname);
// }

// export function useRouteTitle() {
//     const pathname = usePathname();

//     if (STATIC_TITLES[pathname]) {
//         return STATIC_TITLES[pathname];
//     }

//     const dynamicMatch = DYNAMIC_PATTERNS.find((route) => matchNextPath(route.path, pathname));

//     return dynamicMatch ? dynamicMatch.title : 'Страница не найдена...';
// }
'use client';

import { usePathname } from 'next/navigation';
import { STATIC_TITLES, DYNAMIC_PATTERNS } from '@/shared/constants';

function matchNextPath(pattern: string, pathname: string): boolean {
  const regexPattern = pattern
    .replace(/\[\.\.\.[^\]]+\]/g, '.*') // Для catch-all роутов [...slug]
    .replace(/\[[^\]]+\]/g, '[^/]+'); // Для обычных динамических параметров [id]

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(pathname);
}

// Вспомогательная функция для поиска заголовка одного конкретного пути
function findTitleForPath(path: string): string | null {
  if (STATIC_TITLES[path]) {
    return STATIC_TITLES[path];
  }
  const dynamicMatch = DYNAMIC_PATTERNS.find((route) => matchNextPath(route.path, path));
  return dynamicMatch ? dynamicMatch.title : null;
}

export function useRouteTitle(): string[] {
  const pathname = usePathname();

  // 1. Если путь корневой, возвращаем заголовок главной страницы (если есть) или пустой массив
  if (pathname === '/') {
    const rootTitle = findTitleForPath('/');
    return rootTitle ? [rootTitle] : [];
  }

  // 2. Разбиваем текущий pathname на сегменты (например, '/planner/boil' -> ['planner', 'boil'])
  const segments = pathname.split('/').filter(Boolean);
  const titles: string[] = [];
  let currentPath = '';

  // 3. Последовательно собираем пути и ищем для них заголовки
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const title = findTitleForPath(currentPath);

    if (title) {
      titles.push(title);
    }
  }

  // 4. Если не удалось найти заголовок ни для одного сегмента
  return titles.length > 0 ? titles : ['Страница не найдена...'];
}
