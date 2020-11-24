import React, {ReactNode} from 'react'

type PropsType = {
    headerGroups: Array<{
        getFooterGroupProps: () => void
        getHeaderGroupProps: () => void
        headers: Array<{
            getHeaderProps: () => void
            render: (str: string) => ReactNode
            getSortByToggleProps: () => void
            isSorted: boolean
            isSortedDesc: boolean | undefined
            canSort: boolean
            canFilter: boolean | undefined
        }>
    }>
}

export const TableHead = ({headerGroups}: PropsType) => {

    return (<thead>
    {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                    <span {...column.getSortByToggleProps()}>
                        {column.isSorted ? (column.isSortedDesc ? '🔼' : '🔽')
                            : column.canSort ? ' ↕️' : ''}
                    </span>
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>))}
        </tr>))}
    </thead>)
}