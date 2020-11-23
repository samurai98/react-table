import React from 'react'

export type columnFilterPropsType = {
    column: {
        filterValue: string
        setFilter: (value: string) => void
    }
}

export const ColumnFilter = ({column}: columnFilterPropsType) => {
    const {filterValue, setFilter} = column
    return (
        <span>
            <input type="text"
                   value={filterValue || ''}
                   placeholder={'Search'}
                   onChange={(e) => setFilter(e.target.value)}/>
        </span>
    )
}