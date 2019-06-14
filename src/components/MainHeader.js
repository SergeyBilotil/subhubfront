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
import MainContent from "./MainContent";


class MainHeader extends Component {
  constructor(props) {
    super(props);
      this.state = {
        FirstselectedDate: new Date("2000-01-01"),
        SecondselecteDate: new Date("2050-01-01"),
        Listcities: [],
        ListVenues: [],
        city: '',
        venue: '',
        name: 'hai',
      
      }
  }
  componentDidMount() {
    
    fetch(`https://stubhub.dataforest.tech/cities`)
    .then(res => res.json())
    .then(
      (items) => {
        
        this.setState({
          Listcities: items,
        
        });
        
      });
    
  }
  
  componentDidUpdate(prevState ) {
  
    const cityname = this.state.city
    if (this.state.city ) {
    fetch(`https://stubhub.dataforest.tech/venues?city=${cityname}`)
    .then(res => res.json())
    .then(
      (items2) => {
        
        this.setState({
          ListVenues: items2,
        
        });
        
      });
    }
  }
  handleDateChange = (FirstselectedDate,SecondselecteDate) => date=> {
   
    this.setState({
      [FirstselectedDate]: date.format( "MM-DD-YYYY"),
      [SecondselecteDate]: date.format( "MM-DD-YYYY")
    })
  }
  handleChangeVenu = name => event => { 
    this.setState({
      
     
      venue: '',
      [name]: event.target.value,
    });

  };



   handleChange = name => event => {
    
    this.setState({
      
      city: '',
      
      [name]: event.target.value,
    });
  };
  render() {
  
  const Listcities = this.state.Listcities
  const ListVenues = this.state.ListVenues
  
  
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
  <FormControl className="" >
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          City
        </InputLabel>
        <NativeSelect
          name="city"
          value={this.state.city}
          onChange={this.handleChange('city')}
          input={<Input name="city" id="age-native-label-placeholder" />}
        >
          <option>Change city</option>
          {Listcities.map(item => (
                <option key={item}>
                  {item}
                </option>
              ))}
        </NativeSelect>
        
      </FormControl>
      <FormControl className="Location">
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Venue
        </InputLabel>
        <NativeSelect
          name="venue"
          value={this.state.venue}
          onChange={this.handleChangeVenu('venue')}
          input={<Input name="venue" id="age-native-label-placeholder" />}
        >
          <option>Change venue</option>
          {ListVenues.map(item => (
                <option key={item.name}>
                  {item.name}
                </option>
              ))}
        </NativeSelect>
        
      </FormControl>
      <Button  type="submit" variant="contained" color="primary" className="button">
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
