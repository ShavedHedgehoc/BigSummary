import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui';
import { ChangeStateForm } from '@/features/change-state-form';
import { CancelHistoryButton } from '@/features/history-cancellation';
import { EditDocRowForm } from '@/features/edit-doc-row';
import { TApplicationDocDetailRowItem } from '@repo/schemas';
import { DeleteDocRowButton } from '@/features/delete-doc-row';
import { FormSubheader, THistorySidePanelContext } from '@/entities/history';
import { trpc } from '@/shared/api';
import { UploadDocForm } from '@/features/upload-doc';
import { cn } from '@/shared/lib';

export function ActionPanel(props: THistorySidePanelContext) {
  const { row } = props;

  const { data: plantData } = trpc.application.main.plant.getPlantList.useQuery(undefined, {
    staleTime: Infinity,
  });

  if (props.mode !== 'upload_doc' && !row) return null;

  const getHeaderElement = () => {
    switch (props.mode) {
      case 'upload_doc':
        return null;
      case 'planner':
        return <h2 className="mb-4 @max-6xl/main:mt-6 transition-all">Редактирование строки</h2>;
      case 'foreman':
        return <h2 className="mb-4 @max-6xl/main:mt-6 transition-all">Управление фасовкой</h2>;
      case 'laboratory_boils':
      case 'laboratory_products':
      default:
        return <h2 className="mb-4 @max-6xl/main:mt-6 transition-all">Решение лаборатории</h2>;
    }
  };

  const renderForm = () => {
    switch (props.mode) {
      case 'planner':
        return <EditDocRowForm row={row as TApplicationDocDetailRowItem} />;
      case 'upload_doc':
        return <UploadDocForm plantData={plantData ?? []} />;

      case 'laboratory_boils':
      case 'laboratory_products':
      case 'foreman':
      default:
        return <ChangeStateForm {...props} />;
    }
  };

  const renderButtonElement = () => {
    switch (props.mode) {
      case 'upload_doc':
        return null;
      case 'planner':
        return <DeleteDocRowButton row={row as TApplicationDocDetailRowItem} />;
      case 'laboratory_boils':
      case 'laboratory_products':
      case 'foreman':
      default:
        return <CancelHistoryButton {...props} />;
    }
  };

  return (
    <Card className="w-full h-full flex flex-col rounded-xl shadow-none ring-0 ring-offset-0 outline-none border-0 min-h-0 bg-card text-card-foreground">
      <CardHeader className="font-medium text-sm py-3  bg-muted/20 shrink-0 p-0 ">
        <div className="max-w-2xl mx-auto w-full px-4 md:px-6 ">{getHeaderElement()}</div>
        {row && (
          <div className="max-w-2xl mx-auto w-full px-4 md:px-6">
            <FormSubheader row={row} />
          </div>
        )}
      </CardHeader>

      <CardContent
        className={cn(
          'grow p-0 min-h-0 flex flex-col',
          props.mode === 'upload_doc'
            ? 'overflow-hidden'
            : 'overflow-y-auto scrollbar-thin scrollbar-track-card scrollbar-thumb-muted-foreground/50',
        )}
      >
        <div className="max-w-2xl mx-auto w-full h-full flex flex-col min-h-0 md:px-2">
          {renderForm()}
        </div>
      </CardContent>

      {props.mode !== 'upload_doc' && (
        <CardFooter className="mt-auto border-t bg-muted/5 px-4 h-16 flex flex-col items-stretch justify-center shrink-0 w-full">
          <div className="max-w-2xl mx-auto w-full flex flex-col items-stretch">
            {renderButtonElement()}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
