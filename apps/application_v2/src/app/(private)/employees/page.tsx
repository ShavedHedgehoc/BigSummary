'use server';

import { EmployeeList } from '@/widgets/employee-list';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function EmployeesPage({ searchParams }: PageProps) {
  return <EmployeeList searchParams={searchParams} />;
}
