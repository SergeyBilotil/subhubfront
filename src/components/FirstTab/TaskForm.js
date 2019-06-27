import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CityDropdown from '../CityDropdown';


class TaskForm extends Component  {
 
  render() {


  return (
    <div className="main-content">
    <div className="main-header">
        <div className="wrapper">
          
        <form onSubmit={this.props.AddTask}>

       <CityDropdown />
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
