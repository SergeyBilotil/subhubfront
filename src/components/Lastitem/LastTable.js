import React, { Component } from 'react'
import "./LastTable.css"
import Input from '@material-ui/core/Input';
import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CityDropdown from '../CityDropdown';


class LastTable extends Component {
    constructor(props) {
        super(props);
          this.state = {
          eventId: '',
          }
      }
      
      
    render() {
   
        return(
            <div >
              <form onSubmit={this.props.LoadData}>
               <div className="last-table">
                <div className="wrapper"> 
                <CityDropdown />
                <FormControl>
                <label >Event ID</label>
                 <Input
                 name="eventid"
                    placeholder=""
                    className="input"
                    inputProps={{
                    'aria-label': 'Description',
                    }}
                />
                </FormControl>
                <Button type="submit" onClick={this.props.submitNote} variant="contained" color="primary" className="button">
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