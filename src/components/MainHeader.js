import React, { Component } from "react";
import './MainHeader.css'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


class MainHeader extends Component {
  constructor(props) {
    super(props);
      this.state = {
        FirstselectedDate: new Date(),
        SecondselecteDate: new Date(),
        age: '',
        age1: '',
        name: 'hai',
      }
  }
  handleDateChange = (selectedDate,SecondselecteDate) => date=> {
    this.setState({
      [selectedDate]: date,
      [SecondselecteDate]: date
    })
  }

   handleChange = name => event => {
    this.setState({
      
      age: '',
      age1: '',
      [name]: event.target.value,
    });
  };
  render() {
    const { data } = this.state;
    
  return (
    
      <div className="main-header">
          <div className="wrapper">
          
    <MuiPickersUtilsProvider utils={MomentUtils}>
    <KeyboardDatePicker
        autoOk
        variant="inline"
        label="Date from"
        format="MM/DD/YYYY"
        value={this.state.selectedDate}
        onChange={this.handleDateChange('selectedDate')}
      />

<KeyboardDatePicker
        autoOk
        variant="inline"
        label="Date to"
        format="MM/DD/YYYY"
        value={this.state.SecondselecteDate}
        onChange={this.handleDateChange('SecondselecteDate')}
      />
  </MuiPickersUtilsProvider>
  <FormControl className="">
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Location
        </InputLabel>
        <NativeSelect
          value={this.state.age}
          onChange={this.handleChange('age')}
          input={<Input name="age" id="age-native-label-placeholder" />}
        >
          <option value="">All </option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
        
      </FormControl>
      <FormControl className="Location">
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Location2
        </InputLabel>
        <NativeSelect
          value={this.state.age1}
          onChange={this.handleChange('age1')}
          input={<Input name="age1" id="age-native-label-placeholder" />}
        >
         
        </NativeSelect>
        
      </FormControl>
      <Button variant="contained" type="submit" color="primary" className="button">
        Apply
       
        <Icon className="rightIcon"> send</Icon>
                </Button>
             
  </div>
  </div>
  );
}
}

export default MainHeader
