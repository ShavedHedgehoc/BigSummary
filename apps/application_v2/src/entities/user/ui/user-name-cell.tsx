import { cn } from '@/shared/lib';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';
import { TApplicationUserItem } from '@repo/schemas';

export function UserNameCell({
  user,
  showEmail = false,
}: {
  user: TApplicationUserItem;
  showEmail?: boolean;
}) {
  const initials = user.name
    ?.split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="flex items-center gap-3 text-left pl-3">
      {!showEmail && (
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={
              // user.avatar_url ||
              undefined
            }
            alt={user.name}
          />
          <AvatarFallback className="text-xs">{initials || 'XX'}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col">
        <span className={cn('font-medium leading-none ', showEmail && 'text-xs')}>{user.name}</span>
        {showEmail && (
          <span className="text-xs text-muted-foreground mt-1 leading-none ">{user.email}</span>
        )}
      </div>
    </div>
  );
}
