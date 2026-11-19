'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui';
import { TSidePanelContext } from './side-panel';
import { VIEW_PANEL_CONFIG } from '../model/view-panel-config';
import { useState } from 'react';

export function ViewPanel(props: TSidePanelContext) {
  const [isAction, setIsAction] = useState(false);

  const config = VIEW_PANEL_CONFIG[props.mode];
  if (!config) {
    return null;
  }

  const renderSubheader = null;

  return (
    <Card className="w-full h-full flex flex-col rounded-xl shadow-none ring-0 ring-offset-0 outline-none border-0 min-h-0 bg-card text-card-foreground">
      <CardHeader className="font-medium text-sm py-3 bg-muted/20 shrink-0 p-0">
        {config.getTitle(isAction) && (
          <div className="max-w-2xl mx-auto w-full px-4 md:px-6">
            <h2 className="mb-4 @max-6xl/main:mt-6 transition-all">{config.getTitle(isAction)}</h2>
          </div>
        )}
        {config.hasSubheader && (
          <div className="max-w-2xl mx-auto w-full px-4 md:px-6">{renderSubheader}</div>
        )}
      </CardHeader>
      <CardContent className="grow overflow-y-auto p-0 min-h-0">
        {isAction ? (
          <div className="max-w-2xl mx-auto w-full md:px-2">
            {config.getActionForm(props, setIsAction)}
          </div>
        ) : (
          config.renderContent(props)
        )}
      </CardContent>
      <CardFooter className="mt-auto border-t border-border/40 bg-muted/20 px-4 h-14 flex items-center justify-center shrink-0 w-full">
        {config.renderButton()}
      </CardFooter>
    </Card>
  );
}
