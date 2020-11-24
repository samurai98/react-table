import React from 'react'
import {mockDataType} from '../../types/entities'
import '../table.css'

type PropsType = {
    selectedFlatRows: Array<{ original: mockDataType }>
}

export const PreCode = ({selectedFlatRows}: PropsType) => {
    return (<pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedFlatRows: selectedFlatRows.map((row) => row.original)
                        },
                        null,
                        2
                    )}
                </code>
            </pre>)
}