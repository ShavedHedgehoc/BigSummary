// 'use client';

// /* eslint-disable react-hooks/incompatible-library */
// import { cn, useIsMobile } from '@/shared/lib';
// import { Table, TableBody, TableCell, TableHead, TableRow } from '@/shared/ui';
// import {
//   type ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   TableMeta,
//   useReactTable,
// } from '@tanstack/react-table';
// import { Loader2 } from 'lucide-react';

// interface CustomTableMeta {
//   onRowActionSuccess?: () => void;
// }

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   isLoading?: boolean;
//   meta?: CustomTableMeta;
// }

// export function DataTableNew<TData, TValue>({
//   columns,
//   data,
//   isLoading = false,
//   meta,
// }: DataTableProps<TData, TValue>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     meta: meta as TableMeta<TData> & CustomTableMeta,
//   });
//   const isMobile = useIsMobile();
//   const hasRows = !!table.getRowModel().rows?.length;

//   if (!hasRows || isLoading) {
//     return (
//       <div
//         className={cn(
//           'flex grow flex-col items-center justify-center w-full h-full',
//           !isMobile ? 'min-h-100' : 'min-h-40',
//           'text-center text-muted-foreground text-sm',
//         )}
//       >
//         {isLoading ? (
//           <div className="flex flex-col items-center justify-center gap-2">
//             <Loader2 className="h-6 w-6 animate-spin" />
//             <span>Загрузка данных...</span>
//           </div>
//         ) : (
//           'Записи не найдены...'
//         )}
//       </div>
//     );
//   }
//   return (
//     <Table className="w-full border-separate border-spacing-0">
//       {hasRows && (
//         <thead>
//           {table.getHeaderGroups().map((headerGroup, groupIndex) => (
//             <tr key={headerGroup.id} className="border-b-0 bg-transparent! hover:bg-transparent!">
//               {headerGroup.headers.map((header) => {
//                 const isGroup = header.column.getLeafColumns().length > 1;
//                 const isSingle = !header.column.parent && !isGroup;
//                 if (groupIndex === 1 && isSingle) return null;
//                 const rowSpan = isSingle && groupIndex === 0 ? 2 : 1;
//                 const meta = header.column.columnDef.meta;
//                 const shouldGrow = meta?.grow;
//                 const hideBelowFullHD = meta?.hideBelowFullHD;
//                 const hideBelowXL = meta?.hideBelowXL;
//                 const showBelowXL = meta?.showBelowXL;

//                 const isSelectColumn = header.id === 'select';
//                 return (
//                   <TableHead
//                     key={header.id}
//                     colSpan={header.colSpan}
//                     rowSpan={rowSpan}
//                     style={{
//                       width: isSelectColumn ? '44px' : shouldGrow ? 'auto' : header.getSize(),
//                     }}
//                     className={cn(
//                       'dark:text-muted-foreground font-semibold align-middle transition-colors',
//                       'h-10 py-2 px-4',
//                       'hover:bg-transparent! dark:hover:bg-transparent!',
//                       shouldGrow && 'w-full',
//                       'sticky top-0 z-10 bg-background backdrop-blur-sm',
//                       hideBelowXL && '@max-5xl:hidden',
//                       hideBelowFullHD && '@max-7xl:hidden',
//                       showBelowXL && 'hidden @max-5xl:table-cell',
//                       isSelectColumn && 'w-11 shrink-0! min-w-11 p-0 text-center',
//                     )}
//                   >
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                   </TableHead>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//       )}

//       <TableBody>
//         {table.getRowModel().rows?.length ? (
//           table.getRowModel().rows.map((row) => (
//             <TableRow
//               key={row.id}
//               data-state={row.getIsSelected() && 'selected'}
//               className={cn('h-12 hover:bg-muted/70 dark:hover:bg-muted transition-colors group')}
//             >
//               {row.getVisibleCells().map((cell) => {
//                 const meta = cell.column.columnDef.meta;
//                 const shouldGrow = meta?.grow;
//                 const hideBelowFullHD = meta?.hideBelowFullHD;
//                 const hideBelowXL = meta?.hideBelowXL;
//                 const showBelowXL = meta?.showBelowXL;
//                 const isSelectColumn = cell.column.id === 'select';
//                 return (
//                   <TableCell
//                     key={cell.id}
//                     style={{
//                       width: isSelectColumn ? '44px' : shouldGrow ? 'auto' : cell.column.getSize(),
//                     }}
//                     className={cn(
//                       'py-2 px-4 text-foreground text-sm align-middle',
//                       shouldGrow && 'w-full truncate',
//                       'group-odd:bg-muted/50',
//                       'dark:group-odd:bg-muted/50 ',
//                       hideBelowXL && '@max-5xl:hidden',
//                       hideBelowFullHD && '@max-7xl:hidden',
//                       showBelowXL && 'hidden @max-5xl:table-cell',
//                       isSelectColumn && 'w-11 shrink-0! min-w-11 p-0 text-center',
//                     )}
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           ))
//         ) : isLoading ? (
//           <TableRow className="hover:bg-transparent">
//             <TableCell
//               colSpan={columns.length}
//               className="h-96 text-center text-muted-foreground align-middle text-sm"
//             >
//               <div className="flex flex-col items-center justify-center gap-2">
//                 <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
//                 <span>Загрузка данных...</span>
//               </div>
//             </TableCell>
//           </TableRow>
//         ) : (
//           <TableRow className="hover:bg-transparent  h-full">
//             <TableCell
//               colSpan={columns.length}
//               className="p-0 text-center text-muted-foreground align-middle text-sm h-full"
//             >
//               <div className="flex items-center justify-center h-full w-full min-h-75">
//                 Записи не найдены...
//               </div>
//             </TableCell>
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }
'use client';

/* eslint-disable react-hooks/incompatible-library */
import { cn, useIsMobile } from '@/shared/lib';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/shared/ui';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  TableMeta,
  useReactTable,
} from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';

interface CustomTableMeta {
  onRowActionSuccess?: () => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  meta?: CustomTableMeta;
}

export function DataTableNew<TData, TValue>({
  columns,
  data,
  isLoading = false,
  meta,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: meta as TableMeta<TData> & CustomTableMeta,
  });
  const isMobile = useIsMobile();
  const hasRows = !!table.getRowModel().rows?.length;

  if (isLoading || !hasRows) {
    return (
      <div
        className={cn(
          'relative w-full  grow flex flex-col',
          isMobile ? 'min-h-[calc(100svh-400px)]' : 'min-h-[calc(100svh-600px)]',
        )}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-muted-foreground text-sm   rounded-xl bg-background z-20">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Загрузка данных...</span>
            </div>
          ) : (
            'Записи не найдены...'
          )}
        </div>
      </div>
    );
  }

  return (
    <Table className="w-full border-separate border-spacing-0">
      <thead>
        {table.getHeaderGroups().map((headerGroup, groupIndex) => (
          <tr key={headerGroup.id} className="border-b-0 bg-transparent! hover:bg-transparent!">
            {headerGroup.headers.map((header) => {
              const isGroup = header.column.getLeafColumns().length > 1;
              const isSingle = !header.column.parent && !isGroup;
              if (groupIndex === 1 && isSingle) return null;
              const rowSpan = isSingle && groupIndex === 0 ? 2 : 1;
              const meta = header.column.columnDef.meta;
              const shouldGrow = meta?.grow;
              const hideBelowFullHD = meta?.hideBelowFullHD;
              const hideBelowXL = meta?.hideBelowXL;
              const showBelowXL = meta?.showBelowXL;

              const isSelectColumn = header.id === 'select';
              return (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  rowSpan={rowSpan}
                  style={{
                    width: isSelectColumn ? '44px' : shouldGrow ? 'auto' : header.getSize(),
                  }}
                  className={cn(
                    'dark:text-muted-foreground font-semibold align-middle transition-colors',
                    'h-10 py-2 px-4',
                    'hover:bg-transparent! dark:hover:bg-transparent!',
                    shouldGrow && 'w-full',
                    'sticky top-0 z-10 bg-background backdrop-blur-sm',
                    hideBelowXL && '@max-5xl:hidden',
                    hideBelowFullHD && '@max-7xl:hidden',
                    showBelowXL && 'hidden @max-5xl:table-cell',
                    isSelectColumn && 'w-11 shrink-0! min-w-11 p-0 text-center',
                  )}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </tr>
        ))}
      </thead>

      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className={cn('h-12 hover:bg-muted/70 dark:hover:bg-muted transition-colors group')}
          >
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta;
              const shouldGrow = meta?.grow;
              const hideBelowFullHD = meta?.hideBelowFullHD;
              const hideBelowXL = meta?.hideBelowXL;
              const showBelowXL = meta?.showBelowXL;
              const isSelectColumn = cell.column.id === 'select';
              return (
                <TableCell
                  key={cell.id}
                  style={{
                    width: isSelectColumn ? '44px' : shouldGrow ? 'auto' : cell.column.getSize(),
                  }}
                  className={cn(
                    'py-2 px-4 text-foreground text-sm align-middle',
                    shouldGrow && 'w-full truncate',
                    'group-odd:bg-muted/50',
                    'dark:group-odd:bg-muted/50 ',
                    hideBelowXL && '@max-5xl:hidden',
                    hideBelowFullHD && '@max-7xl:hidden',
                    showBelowXL && 'hidden @max-5xl:table-cell',
                    isSelectColumn && 'w-11 shrink-0! min-w-11 p-0 text-center',
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
