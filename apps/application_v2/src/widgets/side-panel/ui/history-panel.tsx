'use client';

import { FormSubheader } from '@/entities/history';
import { HistoryTable } from '@/features/view-histories';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui';
import { useState } from 'react';
import { HISTORY_PANEL_CONFIG } from '../model/history-panel.config';
import { TSidePanelContext } from './side-panel';

export function HistoryPanel(props: TSidePanelContext) {
  const [isAction, setIsAction] = useState(false);

  if (props.mode === 'upload_doc' || props.mode === 'admin_users' || !props.row) {
    return null;
  }
  const config = HISTORY_PANEL_CONFIG[props.mode];

  return (
    <Card className="w-full h-full flex flex-col rounded-xl shadow-none ring-0 ring-offset-0 outline-none border-0 min-h-0 bg-card text-card-foreground">
      <CardHeader className="font-medium text-sm py-3 bg-muted/20 shrink-0 p-0">
        <div className="max-w-2xl mx-auto w-full px-4 md:px-6">
          <h2 className="mb-4 @max-6xl/main:mt-6 transition-all">{config.getTitle(isAction)}</h2>
        </div>
        {config.hasSubheader && (
          <div className="max-w-2xl mx-auto w-full px-4 md:px-6">
            <FormSubheader row={props.row} />
          </div>
        )}
      </CardHeader>
      <CardContent className="grow overflow-y-auto p-0 min-h-0">
        {isAction ? (
          <div className="max-w-2xl mx-auto w-full md:px-2">
            {config.getActionForm(props, setIsAction)}
          </div>
        ) : (
          <HistoryTable rows={props.row.histories ?? []} onClose={props.onClose} />
        )}
      </CardContent>
      <CardFooter className="mt-auto border-t border-border/40 bg-muted/20 px-4 h-14 flex items-center justify-center shrink-0 w-full">
        {config.getActionButton(props, isAction, setIsAction)}
      </CardFooter>
    </Card>
  );
}
