import React, {RefAttributes} from 'react'
import {Checkbox} from './Checkbox'

type PropsType = {
    getToggleHideAllColumnsProps: () => RefAttributes<any>
    allColumns: Array<{
        id: string
        getToggleHiddenProps: () => void
        Header: string
    }>
}

export const ToggleVisibilityColumns = ({getToggleHideAllColumnsProps, allColumns}: PropsType) => {
    return (<div className={'toggleVisibilityColumns'}>
        Show columns:
        <div>
            <Checkbox {...getToggleHideAllColumnsProps()} />All columns
        </div>
        {allColumns.map((column) => (
            <div key={column.id}>
                <label>
                    <input type="checkbox" {...column.getToggleHiddenProps()}/>
                    {column.id === 'selection' ? 'Selection' : column.Header}
                </label>
            </div>
        ))}
    </div>)
}