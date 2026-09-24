import { FormSubheader, THistorySidePanelContext } from '@/entities/history';
import { useDocDetailUiParams } from '@/entities/record';
import { AddHistoryButton, AddHistoryForm } from '@/features/add-history-godmode';
import { CancelHistoryButton } from '@/features/history-cancellation';
import { HistoryTable } from '@/features/view-histories';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui';
import { useState } from 'react';

export function HistoryPanel(props: THistorySidePanelContext) {
  const { mode, row } = props;
  const [isAction, setIsAction] = useState(false);
  const { setParams: setDocDetailUiParams } = useDocDetailUiParams();
  if (!row) return null;

  const getTitle = () => {
    if (mode === 'planner') {
      return isAction ? 'Добавление статуса' : 'История статусов';
    }

    return 'История статусов';
  };

  const getSubheader = () => {
    if (mode === 'planner') {
      return <FormSubheader row={row} />;
    }
    if (mode === 'laboratory_boils') {
      return <FormSubheader row={row} />;
    }
    if (mode === 'laboratory_products') {
      return <FormSubheader row={row} />;
    }
    return '';
  };

  const getActionButton = () => {
    if (mode === 'planner') {
      return <AddHistoryButton isAction={isAction} setIsAction={setIsAction} />;
    }
    if (mode === 'laboratory_boils') {
      return <CancelHistoryButton {...props} />;
    }
    if (mode === 'laboratory_products') {
      return <CancelHistoryButton {...props} />;
    }
    if (mode === 'foreman') {
      return <CancelHistoryButton {...props} />;
    }

    return null;
  };

  const getActionForm = () => {
    if (mode === 'planner') {
      return (
        <AddHistoryForm
          row={row}
          onSuccess={() => {
            setIsAction(false);
            setDocDetailUiParams({ selectedRecordId: null });
          }}
        />
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-full flex flex-col rounded-xl shadow-none ring-0 ring-offset-0 outline-none border-0 min-h-0 bg-card text-card-foreground">
      <CardHeader className="font-medium text-sm py-3  bg-muted/20 shrink-0 p-0 ">
        <div className="max-w-2xl mx-auto w-full px-4 md:px-6 ">
          <h2 className="mb-4 @max-6xl/main:mt-6 transition-all">{getTitle()}</h2>
        </div>
        <div className="max-w-2xl mx-auto w-full px-4 md:px-6">{getSubheader()}</div>
      </CardHeader>
      <CardContent className="grow overflow-y-auto  p-0 min-h-0 ">
        {isAction ? (
          <div className="max-w-2xl mx-auto w-full  md:px-2">{getActionForm()}</div>
        ) : (
          <HistoryTable rows={row.histories ?? []} onClose={props.onClose} />
        )}
      </CardContent>
      <CardFooter className="mt-auto border-t border-border/40 bg-muted/20 px-4 h-14 flex items-center justify-center shrink-0 w-full">
        {getActionButton()}
      </CardFooter>
    </Card>
  );
}
