import { employeeListParamsCache } from '@/entities/employee';
import EmployeeListView from './employee-list-view';

type EmployeeListProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function EmployeeList({ searchParams }: EmployeeListProps) {
  await employeeListParamsCache.parse(searchParams);
  return <EmployeeListView />;
}
