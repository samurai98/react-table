import React, {ReactNode} from 'react'

type PropsType = {
    footerGroups: Array<{
        getFooterGroupProps: () => void
        getHeaderGroupProps: () => void
        headers: Array<{
            getFooterProps: () => void
            render: (str: string) => ReactNode
        }>
    }>
}

export const TableFoot = ({footerGroups}: PropsType) => {

    return (<tfoot>
    {footerGroups.map((footerGroup) => (
        <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps()}>
                    {column.render('Footer')}
                </td>
            ))}
        </tr>
    ))}
    </tfoot>)
}