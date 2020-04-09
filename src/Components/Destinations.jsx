import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';

export class Destinations extends Component {
    render() {
        return (
            <Paper component="form" style={{padding:'3px 20px 3px 20px', paddingBottom: this.props.coords.length? '33px':'3px', marginTop:'10px', textAlign:'left'}}>
                <h4 style={{ fontSize:'15.5px'}}>Destination List</h4>
            <div>

                {this.props.coords.map((coord,index) => (
                    <div key={index} style={{padding:'0px', height:'44px'}}>
                        <span className="circle"  style={{ fontSize:'14.5px'}}>{index+1}</span>
                        <h5 style={{display:'inline-block', fontSize:'14.5px'}}>{coord}</h5>
                    </div>
                ))}
                </div>
                </Paper>
        )
    }
}

export default Destinations
