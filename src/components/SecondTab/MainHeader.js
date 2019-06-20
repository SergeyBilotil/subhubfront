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
        FirstselectedDate: null,
        SecondselecteDate: null,
        Listcities: [],
        ListVenues: [],
        city: '',
        venue: '',
        name: 'hai',
      
      }
  }
  componentDidMount() {
    
    fetch(`https://stubhub.dataforest.tech/api/cities`)
    .then(res => res.json())
    .then(
      (items) => {
        
        this.setState({
          Listcities: items,
        
        });
        
      });
    
  }
 
   componentDidUpdate(prevState , nextState) {
  
    const cityname = this.state.city
    if (this.state.city !== nextState.city) {
    fetch  (`https://stubhub.dataforest.tech/api/venues?city=${cityname}`)
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
          <option value=""  >All </option>
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
          <option value=""  >All</option>
          {ListVenues.map(item => (
                <option  key={item.name}>
                  {item.name}
                </option>
              ))}
        </NativeSelect>
        
      </FormControl>
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
