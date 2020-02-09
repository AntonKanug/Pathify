import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl';

export class App extends Component {
    state= {
        viewport : {
            width: "100%",
            height: "100vh",
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 8
        }
    }
    render() {

        return (
            <div>
                <ReactMapGL
                    {...this.state.viewport}
                    mapStyle={'mapbox://styles/antondilon/ck6f57y7g7irc1inwhihl51yp'}
                    mapboxApiAccessToken={"pk.eyJ1IjoiYW50b25kaWxvbiIsImEiOiJjazZmNHA1bWoxNHoyM29td2k1MjVncm16In0.k99zSrB13Geh7G_bU-GZzw"}
                    onViewportChange={(viewport) => this.setState({viewport})}
                />
            </div>
        )
    }
}

export default App
