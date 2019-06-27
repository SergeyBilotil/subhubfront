import React, { Component } from "react";
import './MainHeader.css'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CityDropdown from "../CityDropdown";


class MainHeader extends Component {
  constructor(props) {
    super(props);
      this.state = {

        FirstselectedDate: null,
        SecondselecteDate: null, 
     
      }
  }

 
  
  handleDateChange = (FirstselectedDate,SecondselecteDate) => date=> {
    
    this.setState({
      [FirstselectedDate]: date.format( "MM-DD-YYYY"),
      [SecondselecteDate]: date.format( "MM-DD-YYYY")
    })
  }
  
  render() {
  
 
  
  
  return (
    
    <div className="main-content">
      <div className="main-header">
          <div className="wrapper">
  
          <form onSubmit={this.props.LoadMainData}>
    <MuiPickersUtilsProvider utils={MomentUtils} >
    <KeyboardDatePicker
        autoOk
        name="startdate"
        variant="inline"
        
        label="Date from"
        format="MM-DD-YYYY"
        value={this.state.FirstselectedDate}
        onChange={this.handleDateChange('FirstselectedDate')}
      />

<KeyboardDatePicker
        autoOk
        name="enddate"
        variant="inline"
        label="Date to"
        format="MM-DD-YYYY"
        value={this.state.SecondselecteDate}
        onChange={this.handleDateChange('SecondselecteDate')}
      />
  </MuiPickersUtilsProvider>
  
       <CityDropdown />
       
  
        
     
      <Button  type="submit" onClick={this.props.submitNote} variant="contained" color="primary" className="button">
        Apply
       
        <Icon className="rightIcon"> send</Icon>
                </Button>
      </form>
             
  </div>
   
  </div>
  
  </div>
  );
}
}

export default MainHeader
