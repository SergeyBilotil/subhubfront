import React, { Component } from 'react'
import "./LastTable.css"
import Input from '@material-ui/core/Input';
import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
class LastTable extends Component {
    constructor(props) {
        super(props);
          this.state = {
          lastListVenues: [],
          eventId: '',
          lastvenue: ''
          }
      }
      componentDidMount() {
  
        fetch(`https://stubhub.dataforest.tech/venues`)
        .then(res => res.json())
        .then(
          (items2) => {
            
            this.setState({
              lastListVenues: items2,
            
            });
            
          });
        
      }
      handleChange = name => event => {
    
        this.setState({
          
          
          lastvenue: '',
          [name]: event.target.value,
        });
      };
    render() {
      const lastListVenues = this.state.lastListVenues
        return(
            <div >
              <form onSubmit={this.props.LoadData}>
               <div className="last-table">
                <div className="wrapper"> 
                <FormControl className="" >
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Select Venue
        </InputLabel>
        <NativeSelect
          name="lastvenue"
          value={this.state.lastvenue}
          onChange={this.handleChange('lastvenue')}
          input={<Input name="lastvenue" id="age-native-label-placeholder" />}
        >
          <option>Change city</option>
          {lastListVenues.map(item => (
                <option  >
                  {item.name}
                </option>
              ))}
        </NativeSelect>
        
      </FormControl>
                <FormControl>
                <label for="first-input">Event ID</label>
                 <Input
                 name="eventid"
                    placeholder=""
                    className="input"
                    inputProps={{
                    'aria-label': 'Description',
                    }}
                />
                </FormControl>
                <Button type="submit" variant="contained" color="primary" className="button">
        Apply
       
        <Icon className="rightIcon"> send</Icon>
                </Button>
                
                </div>
               </div>
               </form>
            </div>
        )
    }
}

export default LastTable 