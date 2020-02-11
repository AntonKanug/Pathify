import React, { Component } from 'react'
import Map from './Map'
import Search from './Search'
export class App extends Component {
    render() {

        return (
            <div>
                <Search/>
                <Map />
            </div>
        )
    }
}

export default App
