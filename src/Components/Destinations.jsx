import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export class Destinations extends Component {
    state={show:true}
    render() {
        return (
            <Paper component="form" style={{padding:'3px 20px 3px 20px', paddingBottom: this.props.coords.length? '33px':'3px', marginTop:'10px', textAlign:'left',width:'410px'}}>
                <h4 style={{ fontSize:'15.5px',display:'inline-block'}}>Destination List</h4>
                <IconButton color="primary" aria-label="search" onClick={()=>this.setState({show:!this.state.show})} style={{float:'right',marginRight:"5px", color:"#0fa1f0",display:'inline-block'}}>
                   {this.state.show? <ExpandLessIcon />: <ExpandMoreIcon />}
                </IconButton>
            <div>


                {this.state.show?this.props.coords.map((coord,index) => (
                    <div key={index} style={{padding:'0px', height:'44px'}}>
                        <span className="circle"  style={{ fontSize:'14.5px'}}>{index+1}</span>
                        <h5 style={{display:'inline-block', fontSize:'14.5px'}}>{coord}</h5>
                    </div>
                )): null}
                </div>
                </Paper>
        )
    }
}

export default Destinations
