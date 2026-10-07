export function ActionPanelHeader({ headerTitle }: { headerTitle: string | null }) {
  if (!headerTitle) return null;
  return (
    <div className="max-w-2xl mx-auto w-full px-4 md:px-6">
      <h2 className="mb-4 @max-6xl/main:mt-6 transition-all">{headerTitle}</h2>
    </div>
  );
}
