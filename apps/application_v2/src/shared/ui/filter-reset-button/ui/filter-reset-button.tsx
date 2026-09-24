import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/button';

export interface IFilterResetButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'isDirty' | 'onClick'
> {
  isDirty: boolean;
  mobile: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

export function FilterResetButton({
  isDirty,
  onClick,
  className,
  mobile,
  icon,
  label,
  ...props
}: IFilterResetButtonProps) {
  if (!isDirty) return null;
  return (
    <Button
      {...props}
      type="button"
      size="sm"
      variant={mobile ? 'outline' : 'ghost'}
      className={cn('py-0! px-5 text-xs', className)}
      onClick={onClick}
      disabled={!isDirty}
    >
      {icon}
      {label}
    </Button>
  );
}
