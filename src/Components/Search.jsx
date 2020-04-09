import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import AddIcon from '@material-ui/icons/Add';
import Geocode from "react-geocode";
import LocationIQ from 'react-native-locationiq';
import Destinations from './Destinations'
import Map from './Map'
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
LocationIQ.init("dec43a4fbe212b");
    
    const StyledTextField = withStyles({
        root: {
          '& label.Mui-focused': {
            color: '#FEBD69',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#FEBD69',
          }
        }
    })(TextField);


export class Search extends Component {
    state= {coords:[], coordsName:[], text:'',loading:false, path:[]}
    
    convert = (address) => { 
        LocationIQ.search(address).then(
        response => {
            this.setState({coords:this.state.coords.concat({lat: Number(response[0].lat), long:Number(response[0].lon)}), coordsName: this.state.coordsName.concat(address) }) ;
            this.setState({rsp:!this.state.rsp})
        },
        error => {
            console.error(error);
        }
        );}

    addLoc = () =>{
        if(!this.state.coordsName.includes(this.state.text))
            this.convert(this.state.text)
    }

    submit = () => {
        axios.post('http://localhost:8080/test',
             this.state.coords
        ).then( (res) => {
            console.log(res)
            this.setState({path:res.data,loading:false})
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    clear = () => {
        this.setState({coords:[], coordsName:[], text:'',loading:false, path:[]})
    }
    render() {
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
                       

            </Paper>
            {this.state.coordsName.length? <Destinations coords={this.state.coordsName}/>: null}

            </div>
                <Map coords={this.state.path} points={this.state.coords}/>
            </div>
        )
    }
}

export default Search
