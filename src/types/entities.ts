export type columnsType = {
    Header: 'Id' | 'First Name' | 'Last Name' | 'Date of Birth' | 'Country' | 'Phone'
    Footer: 'Id' | 'First Name' | 'Last Name' | 'Date of Birth' | 'Country' | 'Phone'
    accessor: 'id' | 'first_name' | 'last_name' | 'date_of_birth' | 'country' | 'phone'
}

export type columnsGroupedType = columnsType | {
    Header: string
    Footer: string
    columns: Array<columnsType>
}

export type mockDataType = Array<{
    id: number
    first_name: string
    last_name: string
    email: string
    date_of_birth: string
    age: number
    country: string
    phone: string
}>