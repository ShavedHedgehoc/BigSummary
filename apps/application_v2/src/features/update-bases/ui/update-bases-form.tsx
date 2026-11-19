'use client';

import { FieldGroup, LoaderCard, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { FormProvider } from 'react-hook-form';
import { FileField } from './form-fields';
import { FormFooter } from './form-footer';
import { UploadErrorsTable } from './error-table';
import { useUpdateBasesForm } from '../model/use-form';
import { ValidationStatusButton } from './validation-status-button';

const MAX_ERRORS_LENGTH = 1000 as const;

export function UpdateBasesForm() {
  const { form, uploadPending, onSubmit, validate, resetXlsx, ...state } = useUpdateBasesForm();

  const hasErrors = state.errors && state.errors.length > 0;
  const canViewErrors = hasErrors && state.errors.length < MAX_ERRORS_LENGTH;

  if (uploadPending) return <LoaderCard />;

  return (
    <FormProvider {...form}>
      <Tabs defaultValue="form" className="w-full h-full flex flex-col min-h-0 px-4">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="form">Форма загрузки</TabsTrigger>
          <TabsTrigger
            value="errors"
            disabled={!hasErrors || !canViewErrors}
            className="text-status-fail"
          >
            Ошибки ({state.errors.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="grow min-h-0 m-0 flex flex-col">
          <div className="w-full h-full flex flex-col gap-5 py-2 ">
            <div className="shrink-0 pt-2 border-t border-dashed border-border/60">
              <ValidationStatusButton
                type="button"
                form="update-bases-form"
                isValid={state.isValid}
                isPending={state.isPending}
                errors={state.errors}
                hasFile={!!state.fileValue}
              />
            </div>
            <form
              id="update-bases-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grow min-h-0"
            >
              <FieldGroup>
                <div className="flex flex-col gap-4">
                  <FileField
                    fileInputRef={state.fileInputRef}
                    acceptedFiles={state.acceptedFiles}
                    reset={resetXlsx}
                    validate={validate}
                  />
                  <FormFooter
                    fileInputRef={state.fileInputRef}
                    resetCustom={resetXlsx}
                    resetDisable={state.resetDisable}
                    submitDisable={state.submitDisable}
                  />
                </div>
              </FieldGroup>
            </form>
          </div>
        </TabsContent>

        {hasErrors && (
          <TabsContent value="errors" className="grow min-h-0 m-0 flex flex-col overflow-hidden">
            <UploadErrorsTable errors={state.errors} />
          </TabsContent>
        )}
      </Tabs>
    </FormProvider>
  );
}
