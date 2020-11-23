import React from 'react'
import './App.css'
import {BasicTable} from './components/BasicTable'
import {FilteringTable} from './components/FilteringTable'
import {SortingTable} from './components/SortingTable'
import {PaginationTable} from './components/PaginationTable'
import {RowSelection} from './components/RowSelection'
import {ColumnOrder} from './components/ColumnOrder'
import {ColumnHiding} from './components/ColumnHiding'

function App() {
    return (
        <div>
            <ColumnHiding/>
        </div>
    );
}

export default App;
