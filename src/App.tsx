import React from 'react'
import './App.css'
import {BasicTable} from './components/BasicTable'
import {FilteringTable} from './components/FilteringTable'
import {SortingTable} from './components/SortingTable'
import {PaginationTable} from './components/PaginationTable'

function App() {
    return (
        <div className={'App'}>
            <PaginationTable/>
        </div>
    );
}

export default App;
