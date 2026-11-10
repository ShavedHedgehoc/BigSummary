import { useQueryStates } from 'nuqs';
import { traceWghtReportUiSchema } from './ui-schema';

export function useWghtReportUiParams() {
  const [params, setParams] = useQueryStates(traceWghtReportUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
