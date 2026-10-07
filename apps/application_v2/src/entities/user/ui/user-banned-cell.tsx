import { Ban, UserCheck } from 'lucide-react';
import { TApplicationUserItem } from '@repo/schemas';

export function UserBannedCell({
  user,
  showTitle = true,
}: {
  user: TApplicationUserItem;
  showTitle?: boolean;
}) {
  return (
    <div className="text-center text-xs">
      {user.banned ? (
        <span className="inline-flex items-center gap-2 ">
          <Ban className="h-4 w-4" />
          {showTitle && <span className="leading-none">Запрещен</span>}
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 ">
          <UserCheck className="h-4 w-4 " />
          {showTitle && <span className="leading-none">Разрешен</span>}
        </span>
      )}
    </div>
  );
}
