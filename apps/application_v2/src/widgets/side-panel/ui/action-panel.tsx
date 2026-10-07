'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui';
import { trpc } from '@/shared/api';
import { cn } from '@/shared/lib';
import { ACTION_PANEL_CONFIG } from '../model/action-panel.config';
import { ActionPanelHeader } from './action-panel-header';
import { TSidePanelContext } from './side-panel';

export function ActionPanel(props: TSidePanelContext) {
  const { data: plantData } = trpc.application.main.plant.getPlantList.useQuery(undefined, {
    staleTime: Infinity,
  });

  const config = ACTION_PANEL_CONFIG[props.mode];
  if (config.requiresRow && !props.row) return null;

  const subheaderElement = config.getSubheader(props);

  return (
    <Card className="w-full h-full flex flex-col rounded-xl shadow-none ring-0 ring-offset-0 outline-none border-0 min-h-0 bg-card text-card-foreground">
      <CardHeader className="font-medium text-sm py-3 bg-muted/20 shrink-0 p-0">
        <ActionPanelHeader headerTitle={config.headerTitle} />
        {subheaderElement && (
          <div className="max-w-2xl mx-auto w-full px-4 md:px-6">{subheaderElement}</div>
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
          {config.renderForm(props, plantData ?? [])}
        </div>
      </CardContent>

      {props.mode !== 'upload_doc' && (
        <CardFooter className="mt-auto border-t bg-muted/5 px-4 h-16 flex flex-col items-stretch justify-center shrink-0 w-full">
          <div className="max-w-2xl mx-auto w-full flex flex-col items-stretch">
            {config.renderButton(props)}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
