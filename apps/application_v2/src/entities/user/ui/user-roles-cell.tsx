import {
  Badge,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui';
import { TApplicationRoleItem } from '@repo/schemas';

export function UserRolesCell({
  roles,
  isMobile = false,
}: {
  roles: TApplicationRoleItem[];
  isMobile?: boolean;
}) {
  const displayLimit = 2;
  const extraRoles = roles.length - displayLimit;

  if (isMobile) {
    return (
      <div className="flex justify-start">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted p-1"
              aria-label="Показать примечание"
            >
              <span className="inline-flex items-center justify-center bg-muted-foreground/20 text-muted-foreground w-6 h-6 rounded-full text-xs font-medium">
                {roles?.length ?? 0}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent side="top" align="start" className="max-w-xs wrap-break-words p-3">
            <div className="flex flex-col gap-1.5">
              {roles && roles.length > 0 ? (
                roles.map((role) => (
                  <span key={role.id} className="text-xs">
                    {role.description || role.value}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">Нет ролей</span>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-1.5">
      {roles.slice(0, displayLimit).map((role) => (
        <Badge key={role.id} variant="secondary" className="font-normal text-[11px] px-2 py-0">
          {role.description}
        </Badge>
      ))}

      {extraRoles > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="cursor-help text-[11px] px-1.5 py-0">
                +{extraRoles}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col gap-1">
                {roles.slice(displayLimit).map((role) => (
                  <span key={role.id}>{role.description}</span>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
