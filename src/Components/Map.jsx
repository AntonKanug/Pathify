import React, { Component } from 'react'
import ReactMapGL, {FlyToInterpolator} from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Marker} from 'react-map-gl';
import PolylineOverlay from './PolylineOverlay'

const SIZE = 25

export class Map extends Component {
    state= {
        viewport:{
            width: "100%",
            height: "100vh",
            latitude: 39.01,
            longitude: -105.7821,
            zoom: 6.5,
            upd: false  
        }
    };

    componentWillReceiveProps(){
        if (this.props.points.length && !this.state.upd){
            console.log(this.props.points);

            const viewport = {
                ...this.state.viewport,
                longitude: this.props.points[this.props.points.length-1].long,
                latitude: this.props.points[this.props.points.length-1].lat,
                zoom: 14,
                transitionDuration: 5000,
                transitionInterpolator: new FlyToInterpolator(),
                upd: true
            };
            this.setState({viewport});
        }
    }
    
    render() {
        return (
            <div>
                <ReactMapGL
                    {...this.state.viewport}
                    // mapStyle={'mapbox://styles/antondilon/ck6f57y7g7irc1inwhihl51yp'}
                    mapStyle={'mapbox://styles/antondilon/ck6f9tva40lhg1irzl0tbn3y9'}
                    mapboxApiAccessToken={"pk.eyJ1IjoiYW50b25kaWxvbiIsImEiOiJjazZmNHA1bWoxNHoyM29td2k1MjVncm16In0.k99zSrB13Geh7G_bU-GZzw"}
                    onViewportChange={(viewport) => this.setState({viewport})}
                >
                    {this.props.points.map((point, index) => (
                        <Marker  longitude={point.long} latitude={point.lat} key={index} zIndex={10}>
                            <LocationOnIcon style={{fontSize:'30px', transform: `translate(${-SIZE*1.1 / 2}px,${-SIZE}px)`, color:'red'}}/> 
                        </Marker>
                    ))}

                    <PolylineOverlay points={this.props.coords} zIndex={-2}/>
                </ReactMapGL>
            </div>
        )
    }
}

export default Map
