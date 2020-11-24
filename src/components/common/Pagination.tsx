import React from 'react'

type PropsType = {
    props: {
        pageIndex: number
        pageOptions: string
        gotoPage: (n: number) => void
        previousPage: () => void
        nextPage: () => void
        canPreviousPage: boolean
        canNextPage: boolean
        pageCount: number
        pageSize: number
        setPageSize: (n: number) => void
    }
}

export const Pagination = ({props}: PropsType) => {

    return (<div className={'pagination'}>
        <span>
            Page{' '}
            <strong>
                {props.pageIndex + 1} of {props.pageOptions.length}
            </strong>{' '}|{' '}
            Go to page: {' '}
            <input type="number" min={1} max={props.pageOptions.length}
                   value={props.pageIndex + 1}
                   onChange={e => {
                       const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                       props.gotoPage(pageNumber)
                   }}/>
        </span>

        <button onClick={() => props.gotoPage(0)} disabled={!props.canPreviousPage}>❮❮ First</button>
        <button onClick={() => props.previousPage()} disabled={!props.canPreviousPage}>❮ Previous</button>
        <button onClick={() => props.nextPage()} disabled={!props.canNextPage}>Next ❯</button>
        <button onClick={() => props.gotoPage(props.pageCount - 1)} disabled={!props.canNextPage}>Last ❯❯</button>

        <select value={props.pageSize} onChange={e => props.setPageSize(Number(e.target.value))}>
            {
                [10, 25, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize} rows
                    </option>
                ))
            }
        </select>
    </div>)
}