import React from 'react'
import {columnFilterPropsType} from '../types/entities'

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