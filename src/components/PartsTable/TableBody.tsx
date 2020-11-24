import React, {ReactNode} from 'react'

type PageType = {
    getRowProps: () => void
    cells: Array<{
        getCellProps: () => void
        render: (str: string) => ReactNode
    }>
}

type PropsType = {
    getTableBodyProps: () => void
    page: Array<PageType>
    prepareRow: (row: PageType) => void
}

export const TableBody = ({getTableBodyProps, page, prepareRow}: PropsType) => {

    return (<tbody {...getTableBodyProps()}>
    {page.map((row) => {
        prepareRow(row)
        return (<tr {...row.getRowProps()}>
            {row.cells.map((cell) => {
                return <td {...cell.getCellProps()} > {cell.render('Cell')}</td>
            })}
        </tr>)
    })}
    </tbody>)
}