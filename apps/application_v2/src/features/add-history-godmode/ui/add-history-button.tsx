import { useRoles } from '@/entities/user';
import { DB_ROLES } from '@/shared/constants';
import { Button } from '@/shared/ui';
import { ArrowLeft, Plus } from 'lucide-react';

interface IAddHistoryButtonProps {
  isAction: boolean;
  setIsAction: (value: boolean) => void;
}

export function AddHistoryButton({ isAction, setIsAction }: IAddHistoryButtonProps) {
  const { hasRole } = useRoles();
  const allowAdding = hasRole(DB_ROLES.GODMODE);
  if (!allowAdding) return null;

  const handleToggle = () => {
    setIsAction(!isAction);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={!allowAdding}
      className="w-full h-8 text-xs font-medium gap-1.5"
    >
      {isAction ? <ArrowLeft className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      {isAction ? 'Назад' : 'Добавить запись'}
    </Button>
  );
}
