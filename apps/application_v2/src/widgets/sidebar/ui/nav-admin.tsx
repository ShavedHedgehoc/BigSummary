import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from '@/shared/ui';
import type { TNavItem } from './items';
import Link from 'next/link';

export function NavAdmin({ items }: { items: TNavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Администратор</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuButton asChild key={item.url}>
              <Link href={item.url}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
