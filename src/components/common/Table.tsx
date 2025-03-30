import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

export interface TableColumn<T> {
  header: string;
  accessor: (data: T) => React.ReactNode;
  width?: string;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  loading?: boolean;
  rowClassName?: string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

const Table = <T extends object>({
  columns,
  data,
  className,
  loading,
  rowClassName,
  onRowClick,
  emptyMessage = 'No data found'
}: TableProps<T>) => {
  const tableContent = (
    <ShadcnTable className={cn('w-full', className)}>
      <TableHeader className="bg-muted/50">
        <TableRow className="hover:bg-transparent">
          {columns.map((column, index) => (
            <TableHead
              key={index}
              style={{ width: column.width }}
              className={cn(
                'text-muted-foreground h-10 px-4 text-sm font-medium',
                column.className
              )}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24">
              <div className="text-muted-foreground flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            </TableCell>
          </TableRow>
        ) : data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-muted-foreground h-24 text-center">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={cn(
                'transition-colors',
                onRowClick && 'hover:bg-muted/50 cursor-pointer',
                rowClassName
              )}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className={cn('px-4 py-2.5 text-sm', column.className)}>
                  {column.accessor(row)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </ShadcnTable>
  );

  return (
    <div className="bg-background relative w-full overflow-auto rounded-md border">
      {tableContent}
    </div>
  );
};

export default Table;
