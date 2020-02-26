import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl';
import {Marker} from 'react-map-gl';
import PolylineOverlay from './PolylineOverlay'
const SIZE = 20
const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;


export class Map extends Component {
    state= {
        viewport : {
            width: "100%",
            height: "100vh",
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 12
        }
    }
    render() {

        return (
            <div>
                <ReactMapGL
                    {...this.state.viewport}
                    mapStyle={'mapbox://styles/antondilon/ck6f9tva40lhg1irzl0tbn3y9'}
                    mapboxApiAccessToken={"pk.eyJ1IjoiYW50b25kaWxvbiIsImEiOiJjazZmNHA1bWoxNHoyM29td2k1MjVncm16In0.k99zSrB13Geh7G_bU-GZzw"}
                    onViewportChange={(viewport) => this.setState({viewport})}    
                >
                    <Marker  longitude={-122.4376} latitude={37.7577}>
                    <svg
                    height={SIZE}
                    viewBox="0 0 24 24"
                    style={{
                        cursor: 'pointer',
                        fill: '#d00',
                        stroke: 'none',
                        transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                    }}
                    >
                    <path d={ICON} />
                    </svg>
                </Marker>

                <PolylineOverlay
                points={[
                    { latitude: 37.8025259, longitude: -122.4351431 },
                    { latitude: 37.7896386, longitude: -122.421646 },
                    { latitude: 37.7665248, longitude: -122.4161628 },
                    { latitude: 37.7734153, longitude: -122.4577787 },
                    { latitude: 37.7948605, longitude: -122.4596065 }
                ]} />
                </ReactMapGL>
            </div>
        )
    }
}

export default Map
