import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { AuditRecord } from '../models/audit-record';
import { useState } from 'react';

const columnHelper = createColumnHelper<AuditRecord>();

const data: AuditRecord[] = [
  {
    trackingId: 'TRK001',
    action: 'CREATE',
    source: 'API',
    destination: 'Database',
    eventDate: new Date('2023-05-15'),
    startTime: new Date('2023-05-15T10:30:00'),
    endTime: new Date('2023-05-15T10:30:05'),
    performance: 5,
    statusCode: 200,
    host: 'server1.example.com',
  },
  {
    trackingId: 'TRK002',
    action: 'UPDATE',
    source: 'Web Interface',
    destination: 'File System',
    eventDate: new Date('2023-05-16'),
    startTime: new Date('2023-05-16T14:45:30'),
    endTime: new Date('2023-05-16T14:45:35'),
    performance: 5,
    statusCode: 200,
    host: 'server2.example.com',
  },
  {
    trackingId: 'TRK003',
    action: 'DELETE',
    source: 'Mobile App',
    destination: 'Cache',
    eventDate: new Date('2023-05-17'),
    startTime: new Date('2023-05-17T09:15:00'),
    endTime: new Date('2023-05-17T09:15:02'),
    performance: 2,
    statusCode: 204,
    host: 'server3.example.com',
  },
  {
    trackingId: 'TRK004',
    action: 'READ',
    source: 'Internal Service',
    destination: 'Memory',
    eventDate: new Date('2023-05-18'),
    startTime: new Date('2023-05-18T18:20:10'),
    endTime: new Date('2023-05-18T18:20:11'),
    performance: 1,
    statusCode: 200,
    host: 'server4.example.com',
  },
  {
    trackingId: 'TRK005',
    action: 'UPLOAD',
    source: 'FTP Client',
    destination: 'Cloud Storage',
    eventDate: new Date('2023-05-19'),
    startTime: new Date('2023-05-19T11:05:45'),
    endTime: new Date('2023-05-19T11:05:50'),
    performance: 5,
    statusCode: 201,
    host: 'server5.example.com',
  },
];

const columns = [
  columnHelper.accessor('trackingId', {
    cell: (info) => info.getValue(),
    header: () => <span>TrackingID</span>,
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('action', {
    cell: (info) => info.getValue(),
    header: () => <span>Action</span>,
    sortingFn: 'text',
  }),
  columnHelper.accessor('source', {
    cell: (info) => info.getValue(),
    header: () => <span>Source</span>,
    sortingFn: 'text',
  }),
  columnHelper.accessor('destination', {
    cell: (info) => info.getValue(),
    header: () => <span>Destination</span>,
    sortingFn: 'text',
  }),
  columnHelper.accessor('eventDate', {
    cell: (info) => info.getValue()?.toISOString(),
    header: () => <span>EventDate</span>,
    sortingFn: 'datetime',
  }),
  columnHelper.accessor('startTime', {
    cell: (info) => info.getValue()?.toISOString(),
    header: () => <span>StartTime</span>,
    sortingFn: 'datetime',
  }),
  columnHelper.accessor('endTime', {
    cell: (info) => info.getValue()?.toISOString(),
    header: () => <span>EndTime</span>,
    sortingFn: 'datetime',
  }),
  columnHelper.accessor('performance', {
    cell: (info) => info.getValue(),
    header: () => <span>Performance</span>,
  }),
  columnHelper.accessor('statusCode', {
    cell: (info) => info.getValue(),
    header: () => <span>StatusCode</span>,
    enableSorting: false,
  }),
  columnHelper.accessor('host', {
    cell: (info) => info.getValue(),
    header: () => <span>Host</span>,
  }),
];

export function LogTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
  });

  return (
    <div className='mt-4'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope='col'
                  className='px-6 py-3'
                  {...(header.column.getCanSort()
                    ? { onClick: header.column.getToggleSortingHandler() }
                    : {})}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {header.column.getIsSorted() === 'asc' ? (
                    <span> 🔼</span>
                  ) : header.column.getIsSorted() === 'desc' ? (
                    <span> 🔽</span>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
