'use client';

import { usePathname } from 'next/navigation';
import { STATIC_TITLES, DYNAMIC_PATTERNS } from '@/shared/constants';

function matchNextPath(pattern: string, pathname: string): boolean {
  const regexPattern = pattern.replace(/\[\.\.\.[^\]]+\]/g, '.*').replace(/\[[^\]]+\]/g, '[^/]+');

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(pathname);
}

function findTitleForPath(path: string): string | null {
  if (STATIC_TITLES[path]) {
    return STATIC_TITLES[path];
  }
  const dynamicMatch = DYNAMIC_PATTERNS.find((route) => matchNextPath(route.path, path));
  return dynamicMatch ? dynamicMatch.title : null;
}

export function useRouteTitle(): string[] {
  const pathname = usePathname();
  if (pathname === '/') {
    const rootTitle = findTitleForPath('/');
    return rootTitle ? [rootTitle] : [];
  }

  const segments = pathname.split('/').filter(Boolean);
  const titles: string[] = [];
  let currentPath = '';

  for (const segment of segments) {
    currentPath += `/${segment}`;
    const title = findTitleForPath(currentPath);

    if (title) {
      titles.push(title);
    }
  }

  return titles.length > 0 ? titles : ['Страница не найдена...'];
}
