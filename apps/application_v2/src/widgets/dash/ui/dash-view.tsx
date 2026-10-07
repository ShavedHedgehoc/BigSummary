'use client';

import { useDash } from '../model/use-dash';
import { RecordCard } from '@/entities/record';
import { SidePanel } from '@/widgets/side-panel';
import { UniversalLayoutWithCardScroll } from '@/shared/ui';
import { PageHeader } from '@/widgets/page-header';
import { useRoles } from '@/entities/user/index.client';
import { DB_ROLES } from '@/shared/constants';
import DashFilter from './filter';

export default function DashView() {
  const { hasRole } = useRoles();
  const { data, isLoading, hasSelectedRow, selectedRow, clearSelected, setUiParams } = useDash();

  const isCanSelected = hasRole(DB_ROLES.CARDS);
  const handleSelect = (id: number) => setUiParams({ selectedRecordId: String(id) });

  const renderScrollContent = () => {
    if (!data?.rows || data.rows.length === 0) return null;
    return data.rows.map((row) => (
      <RecordCard
        key={`Card_${row.id}`}
        record={row}
        isSelected={row.id === selectedRow?.id}
        isCanSelected={isCanSelected}
        onSelect={() => handleSelect(row.id)}
      />
    ));
  };
  return (
    <UniversalLayoutWithCardScroll
      hasSelection={hasSelectedRow}
      isLoading={isLoading}
      pageHeader={<PageHeader />}
      filters={<DashFilter />}
      scrollContent={renderScrollContent()}
      sidebarPanel={
        data && (
          <SidePanel
            mode="dash"
            row={selectedRow ?? undefined}
            className="w-full m-0 @min-6xl/main:w-110 shrink-0 h-full max-w-2xl"
            onClose={clearSelected}
          />
        )
      }
    />
  );
}
