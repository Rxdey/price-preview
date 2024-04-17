import { useState, useCallback } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from '@nextui-org/react';
import { columns } from '@/data/table';
import { data as rows } from '@/data/data'
import { ItemData } from './data/data.type';


export default function App() {
  const renderCell = useCallback((row: any, columnKey: string) => {
    const cellValue = row[columnKey as any];
    switch (columnKey) {
      case 'calculated':
        return (
          <div className="relative flex items-center gap-2">
            {(cellValue as number).toFixed(1)}
          </div>
        );
      case 'name':
        return row.filterData.name;
      case 'level':
        return row.filterData.level;

      case 'desc':
        return row.filterData.desc;
      default:
        return cellValue as string;
    }
  }, []);

  return (
    <div className="dark bg-background text-foreground">
      <div>
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key} >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
