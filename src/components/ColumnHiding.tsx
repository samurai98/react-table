import React, {useMemo} from 'react'
import {
    useTable, useSortBy, useGlobalFilter,
    useFilters, usePagination, useRowSelect
} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import {COLUMNS, GROUPED_COLUMNS} from './columns'
import {columnsType, columnsGroupedType, mockDataType} from '../types/entities'
import './table.css'
import {GlobalFilter} from './GlobalFilter'
import {ColumnFilter, columnFilterPropsType} from './ColumnFilter'
import {Checkbox} from './Checkbox'

export const ColumnHiding = () => {

    type defaultColumnType = { Filter: ({column}: columnFilterPropsType) => JSX.Element; }

    const columns: Array<columnsGroupedType> = useMemo(() => GROUPED_COLUMNS, [])
    const data: mockDataType = useMemo(() => MOCK_DATA, [])

    const defaultColumn: any = useMemo((): defaultColumnType => {
        return {
            Filter: ColumnFilter
        }
    }, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        state,
        rows,
        setGlobalFilter,
        selectedFlatRows,
        allColumns,
        getToggleHideAllColumnsProps
    }: any = useTable({
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks: any) => {
            hooks.visibleColumns.push((columns: any) => {
                return [
                    {
                        id: 'selection',
                        Header: ({getToggleAllRowsSelectedProps}: any) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()}/>
                        ),
                        Cell: ({row}: any) => (
                            <Checkbox {...row.getToggleRowSelectedProps()}/>
                        )
                    },
                    ...columns
                ]
            })
        })

    const {globalFilter, pageIndex, pageSize} = state

    const firstPageRows = rows.slice(0, 10)

    return (
        <>
            <div>
                <div>
                    <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
                </div>
                {allColumns.map((column: any) => (
                    <div key={column.id}>
                        <label>
                            <input type="checkbox" {...column.getToggleHiddenProps()}/>
                            {column.Header}
                        </label>
                    </div>
                ))}
            </div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: any) => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                                <span {...column.getSortByToggleProps()}>
                                    {column.isSorted ? (column.isSortedDesc ? '🔼' : '🔽')
                                        : column.canSort ? ' ↕️' : ''}
                                </span>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {firstPageRows.map((row: any) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map((cell: any) => {
                                    return <td {...cell.getCellProps()} > {cell.render('Cell')}</td>
                                })}
                        </tr>
                    )
                })}
                </tbody>
                <tfoot>
                {
                    footerGroups.map((footerGroup: any) => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {
                                footerGroup.headers.map((column: any) => (
                                    <td {...column.getFooterProps()}>
                                        {column.render('Footer')}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
                </tfoot>
            </table>
            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page: {' '}
                    <input type="number" defaultValue={pageIndex + 1}
                           onChange={e => {
                               const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                               gotoPage(pageNumber)
                           }}
                           style={{width: '50px'}}/>
                </span>
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [10, 25, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
            </div>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedFlatRows: selectedFlatRows.map((row: any) => row.original)
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </>
    )
}