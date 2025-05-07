import * as React from 'react';
import { ITableProps } from './types';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export function Table<T>(props: ITableProps<T>) {
  const rowLinkExists = useMemo(() => ['string', 'function'].includes(typeof props.rowLink), [props.rowLink]);
  const navigate = useNavigate();

  function handleClick(row: T) {
    if (typeof props.rowLink === 'string') {
      navigate(props.rowLink);
    } else if (typeof props.rowLink === 'function') {
      navigate(props.rowLink(row));
    }
  }

  return (
    <table className={'table' + props.className ? ` ${props.className}` : ''}>
      <thead>
        <tr>
          {props.columns.map((column, index) => {
            return (
              <th
                className={column.className}
                style={{ width: column.width }}
                key={(column.dataIndex as string) ?? index}
              >
                {column.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={'typography-regular'}>
        {props.dataSource.length ? (
          props.dataSource.map((row, rowIndex) => (
            <tr
              key={`row-${rowIndex}`}
              onClick={rowLinkExists ? () => handleClick(row) : null}
              className={rowLinkExists ? 'table__row_link' : null}
            >
              {props.columns.map((column, cellIndex) => {
                let value: React.ReactNode = (row[column.dataIndex] ?? '') as React.ReactNode;
                if (column.render) value = column.render(value as string, row);

                return (
                  <td className={column.className} key={`row-${rowIndex}-cell-${cellIndex}`}>
                    {value}
                  </td>
                );
              })}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={props.columns.length} style={{ textAlign: 'center' }}>
              Данных нет
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
