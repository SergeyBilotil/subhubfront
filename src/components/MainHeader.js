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
        FirstselectedDate: new Date(),
        SecondselecteDate: new Date(),
        Listcities: [],
        venues: [],
        city: '',
        venue: '',
        name: 'hai',
      
      }
  }
  componentWillMount() {
    fetch(`https://stubhub.dataforest.tech/cities`)
    .then(res => res.json())
    .then(
      (items) => {
        
        this.setState({
          Listcities: items,
        
        });
        
      });
    
  }
  handleVenueСChange(e) {
    e.preventDefault()
   
    fetch(`https://stubhub.dataforest.tech/venues?city=`)
    .then(res => res.json())
    .then(
      (items2) => {
        
        this.setState({
          venues: items2,
        
        });
        console.log(items2)
      });
    
  }
  handleDateChange = (selectedDate,SecondselecteDate) => date=> {
   
    this.setState({
      [selectedDate]: date,
      [SecondselecteDate]: date
    })
  }

   handleChange = name => event => {
    
    this.setState({
      
      city: '',
      venue: '',
      [name]: event.target.value,
    });
  };
  render() {
  
  const Listcities = this.state.Listcities
  const ListVenue = this.state.venue
  console.log(ListVenue)
  
  return (
    
    <div className="main-content">
      <div className="main-header">
          <div className="wrapper">
            
          <form onSubmi={this.handleVenueСChange}>
    <MuiPickersUtilsProvider utils={MomentUtils} >
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
  <FormControl className="" >
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          City
        </InputLabel>
        <NativeSelect
          name="city"
          value={this.state.age}
          onChange={this.handleChange('city')}
          input={<Input name="age" id="age-native-label-placeholder" />}
        >
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
          value={this.state.age1}
          onChange={this.handleChange('venue')}
          input={<Input name="age1" id="age-native-label-placeholder" />}
        >
          <option value="">All </option>
          <option value="Stadio Olimpico">Stadio Olimpico</option>
          <option value="York Lions Stadium">York Lions Stadium</option>
          <option value="Hungaroring">Hungaroring</option>
        </NativeSelect>
        
      </FormControl>
      <Button variant="contained" type="submit" color="primary" className="button">
        Apply
       
        <Icon className="rightIcon"> send</Icon>
                </Button>
      </form>
             
  </div>
   
  </div>
  <MainContent city={this.state.city} venue={this.state.venue}/>
  </div>
  );
}
}

export default MainHeader
