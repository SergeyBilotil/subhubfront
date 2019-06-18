import React, { Component } from 'react'
import Input from '@material-ui/core/Input';
import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TaskItemContent from './TaskItemContent'

export default class TaskItem extends Component {
 render() {

     return (
         <div className='task-block'>
             <div className="task-item-head">

           
                 <form onSubmit>
               <div className="last-table">
                <div className="wrapper"> 

                <FormControl className="" >
                <label for="first-input">Venue</label>
                <Input
                 name="venue"
                    placeholder=""
                    className="input"
                    inputProps={{
                    'aria-label': 'Description',
                    }}
                />
       
        
      </FormControl>
      <FormControl className="Location">
    
                <label for="first-input">Event ID</label>
                 <Input
                 name="event_id"
                    placeholder=""
                    className="input"
                    inputProps={{
                    'aria-label': 'Description',
                    }}
                />
     
      </FormControl>
      <FormControl>
      <label for="first-input">Frequency </label>
                 <Input
                 name="eventid"
                 type="number"
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
               <TaskItemContent />
         </div>
     )
 }
}