import React from 'react'

type globalFilterPropsType = {
    filter: string
    setFilter: (value: string) => void
}

export const GlobalFilter = ({filter, setFilter}: globalFilterPropsType) => {
    return (
        <div className={'globalFilter'}>
            <span>
               Global search: {' '}
                <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)}/>
            </span>
        </div>
    )
}