export function EmptyState() {
  return (
    <div className="hidden @min-6xl/main:flex w-110 flex-col h-full min-h-0 shrink-0 bg-card border rounded-xl overflow-hidden shadow-none">
      <div className="flex items-center justify-center grow h-full text-sm text-muted-foreground font-medium">
        Выберите запись
      </div>
    </div>
  );
}
