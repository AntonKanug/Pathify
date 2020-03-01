import React, { Component } from 'react'
import ReactMapGL, {LinearInterpolator, FlyToInterpolator} from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Marker} from 'react-map-gl';
import d3 from 'd3-ease';
import PolylineOverlay from './PolylineOverlay'

const SIZE = 25
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
            zoom: 12,
            upd: false  
        }
    };

    componentWillReceiveProps(){

       if (this.props.coords.length && !this.state.upd){
        console.log(this.props.coords);

        const viewport = {
            ...this.state.viewport,
            longitude: this.props.coords[this.props.coords.length-1].long,
            latitude: this.props.coords[this.props.coords.length-1].lat,
            zoom: 14,
            transitionDuration: 5000,
            transitionInterpolator: new FlyToInterpolator(),
            upd: true
        };
        this.setState({viewport});
    }

}
    
    render() {

        console.log(this.props.coords)
        var points = this.props.coords
        return (
            <div>
                <ReactMapGL
                    {...this.state.viewport}
                    mapStyle={'mapbox://styles/antondilon/ck6f9tva40lhg1irzl0tbn3y9'}
                    mapboxApiAccessToken={"pk.eyJ1IjoiYW50b25kaWxvbiIsImEiOiJjazZmNHA1bWoxNHoyM29td2k1MjVncm16In0.k99zSrB13Geh7G_bU-GZzw"}
                    onViewportChange={(viewport) => this.setState({viewport})}
                >

                    {points.map((point, index) => (
                        <Marker  longitude={point.long} latitude={point.lat} key={index}>
                            <LocationOnIcon style={{fontSize:'30px', transform: `translate(${-SIZE*1.1 / 2}px,${-SIZE}px)`, color:'red'}}/>
                        </Marker>
                    ))}

                <PolylineOverlay points={this.props.coords} />
                </ReactMapGL>
            </div>
        )
    }
}

export default Map
