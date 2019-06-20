import React, { Component } from 'react';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';



class TaskForm extends Component  {
  constructor(props) {
    super(props);
      this.state = {
       
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
  
  componentDidUpdate(prevState ) {
  
    const cityname = this.state.city
    if (this.state.city ) {
    fetch(`https://stubhub.dataforest.tech/api/venues?city=${cityname}`)
    .then(res => res.json())
    .then(
      (items2) => {
        
        this.setState({
          ListVenues: items2,
        
        });
        
      });
    }
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
          
        <form onSubmit={this.props.AddTask}>

<FormControl className="" >
      
      <NativeSelect
        name="city"
        value={this.state.city}
        onChange={this.handleChange('city')}
        input={<Input name="city" id="age-native-label-placeholder" />}
      >
        <option>Select city</option>
        {Listcities.map(item => (
              <option key={item}>
                {item}
              </option>
            ))}
      </NativeSelect>
      
    </FormControl>
    <FormControl className="Location">
     
      <NativeSelect
        name="venue"
        input={<Input name="venue" id="age-native-label-placeholder" />}
      >
        <option value="">Select venue</option>
        {ListVenues.map(item => (
              <option key={item.name}>
                {item.name}
              </option>
            ))}
      </NativeSelect>
      
    </FormControl>
    <FormControl>
                
                 <Input
                name="eventid"
                 
                  type="number"
                  placeholder="event_id"
                  className="input"
                  inputProps={{
                    'aria-label': 'Description',
                    }}
                />
                </FormControl>
    <FormControl>
               
                 <Input
                 name="frequency"
                    required
                    type="number"
                    placeholder="Frequency"
                    className="input"
                    inputProps={{
                    'aria-label': 'Description',
                    }}
                />
                </FormControl>
    <Button  type="submit"  variant="contained" color="primary" className="button">
      Add Task
     
      <Icon className="rightIcon"> send</Icon>
              </Button>
    </form>
           
</div>
 
</div>
</div>
  );
}
};

export default TaskForm;
