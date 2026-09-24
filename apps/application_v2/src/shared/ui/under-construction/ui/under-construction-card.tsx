import { Construction } from 'lucide-react';

export function UnderConstructionCard() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Construction className="h-10 w-10 animate-pulse text-primary" />
      <p className="text-sm font-medium">Under construction...</p>
    </div>
  );
}
