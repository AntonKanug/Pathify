import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import DirectionsIcon from '@material-ui/icons/Directions';
import AddIcon from '@material-ui/icons/Add';
import LocationIQ from 'react-native-locationiq';
import Destinations from './Destinations'
import Map from './Map'
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
LocationIQ.init("dec43a4fbe212b");

export class Search extends Component {
    state={coords:[], coordsName:[], dist:[{"distance":0.0}],text:'',loading:false, rsp:false,path:[],upda:false}
    
    convert = (address) => { 
        LocationIQ.search(address).then(
        response => {
            this.setState({coords:this.state.coords.concat({lat: Number(response[0].lat), long:Number(response[0].lon)}), coordsName: this.state.coordsName.concat(address) }) ;
            this.setState({false:!this.state.false})
        },
        error => {
            console.error(error);
        }
        );
    }

    addLoc = () =>{
        if(!this.state.coordsName.includes(this.state.text))
            this.convert(this.state.text)
    }

    submit = () => {
        axios.post('https://pathify.herokuapp.com/api/path',
             this.state.coords
        ).then((res) => 
            this.setState({path:res.data[0].points,loading:false,rsp:true,dist: this.state.dist.concat(res.data[1].distances)}))
        .catch(function (error) {
            console.log(error);
        });
    }

    clear = () => {
        this.setState({coords:[], coordsName:[], text:'',loading:false, rsp:false,path:[]})
    }
    render() {
        console.log(this.state.dist)

        return (
            <div>
            <div style={{width:'450px', position:'absolute', zIndex:1, margin:'30px'}}>
            <Paper component="form" >
                <IconButton color="primary" aria-label="search" onClick={() =>this.addLoc()} style={{marginRight:"5px", color:"#0fa1f0"}}>
                    <AddIcon />
                </IconButton>
                <InputBase
                     type="text"
                    style={{width:'300px', opacity:1, fontSize:'16px'}}
                    placeholder="Search Pathify"
                    inputProps={{ 'aria-label': 'Enter Points' }}
                    onChange={(e) => this.setState({text:e.target.value})}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                          this.addLoc();
                          e.preventDefault();
                        }
                      }}
                />
                
                <IconButton color="primary"  aria-label="directions" style={{marginRight:"5px", color:'#38db24'}}>
                    <DirectionsIcon onClick={() =>{
                        this.setState({loading:true})
                        this.submit()
                    }}/>
                </IconButton>

                <Divider orientation="vertical" style={{display:'inline-block', color:'black',height: '30px', margin:'-10px'}}/>

                <IconButton aria-label="directions" onClick={() =>this.clear()} style={{marginLeft:"10px", color:'red'}}>
                    <CloseIcon/>
                </IconButton>
          
                <Snackbar
                style={{fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:'900'}}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                variant="error"
                open={this.state.loading}
                >
                    <SnackbarContent style={{backgroundColor:'white',fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:'900', fontSize: 16}}
                    message={<div ><h4 style={{display:'inline', color:'black'}}>Searching for Path, Please Wait</h4><LinearProgress variant="query"/></div>}
                    action={ <IconButton
                        key="close"
                        aria-label="close"
                        ><CloseIcon style={{color:'black'}}/>
                        </IconButton>}
                    />       
                </Snackbar>

                <Snackbar
                style={{fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:'900'}}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                variant="error"
                autoHideDuration={6000}
                open={this.state.rsp}
                >
                <SnackbarContent style={{backgroundColor:'rgb(80, 209, 0)',fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:'900', fontSize: 16}}
                message="Success, Optimal Path Found!"
                action={ <IconButton
                    key="close"
                    aria-label="close"
                    onClick={() => this.setState({rsp:false})}
                    ><CloseIcon style={{color:'white'}}/>
                    </IconButton>}
                />
            </Snackbar>

            </Paper>

            {this.state.coordsName.length? <Destinations coords={this.state.coordsName} dist={this.state.dist}/>: null}

            </div>
                <Map coords={this.state.path} points={this.state.coords}/>
            </div>
        )
    }
}

export default Search
