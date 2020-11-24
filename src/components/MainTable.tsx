import React, {useMemo} from 'react'
import {
    useTable, useSortBy, useGlobalFilter,
    useFilters, usePagination, useRowSelect
} from 'react-table'
import MOCK_DATA from '../data/MOCK_DATA.json'
import {GROUPED_COLUMNS} from '../data/columns'
import {columnsGroupedType, mockDataType} from '../types/entities'
import './table.css'
import {GlobalFilter} from './Filters/GlobalFilter'
import {ColumnFilter, columnFilterPropsType} from './Filters/ColumnFilter'
import {Checkbox} from './common/Checkbox'
import {PreCode} from './common/PreCode'
import {Pagination} from './common/Pagination'
import {ToggleVisibilityColumns} from './common/ToggleVisibilityColumns'
import {TableHead} from './PartsTable/TableHead'
import {TableBody} from './PartsTable/TableBody'
import {TableFoot} from './PartsTable/TableFoot'

export const MainTable = () => {

    type defaultColumnType = { Filter: ({column}: columnFilterPropsType) => JSX.Element; }

    const columns: Array<columnsGroupedType> = useMemo(() => GROUPED_COLUMNS, [])
    const data: Array<mockDataType> = useMemo(() => MOCK_DATA, [])

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
        (hooks) => {
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

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>

            <ToggleVisibilityColumns getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
                                     allColumns={allColumns}/>

            <table {...getTableProps()}>
                <TableHead headerGroups={headerGroups}/>
                <TableBody getTableBodyProps={getTableBodyProps}
                           page={page} prepareRow={prepareRow}/>
                <TableFoot footerGroups={footerGroups}/>
            </table>

            <Pagination props={{
                pageIndex, pageOptions, gotoPage, previousPage, nextPage,
                canPreviousPage, canNextPage, pageCount, pageSize, setPageSize
            }}/>

            <PreCode selectedFlatRows={selectedFlatRows}/>
        </>
    )
}