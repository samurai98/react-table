import React, {useMemo} from 'react'
import {useTable, useSortBy, useGlobalFilter, useFilters} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import {COLUMNS, GROUPED_COLUMNS} from './columns'
import {columnsType, columnsGroupedType, mockDataType, columnFilterPropsType} from '../types/entities'
import './table.css'
import {GlobalFilter} from './GlobalFilter'
import {ColumnFilter} from './ColumnFilter'

export const FilteringTable = () => {

    type defaultColumnType = { Filter: ({ column }: columnFilterPropsType) => JSX.Element; }

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
        rows,
        prepareRow,
        state,
        setGlobalFilter
    }: any = useTable({
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter,
        useSortBy)

    const {globalFilter} = state

    return (
        <>
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
                {
                    rows.map((row: any) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell: any) => {
                                        return <td {...cell.getCellProps()} > {cell.render('Cell')}</td>
                                    })}
                            </tr>
                        )
                    })
                }
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
        </>
    )
}