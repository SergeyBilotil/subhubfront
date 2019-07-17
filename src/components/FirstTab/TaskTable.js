import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import TaskForm from './TaskForm'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import "./TaskTable.css"
import { authHeader } from '../RegisterPage/_helpers/auth-header';
import { userService } from '../RegisterPage/_services/user.service'

class MainContent extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      addtask: '',
      data: [],
      taskID: '',
   
    };
    this.AddTask = this.AddTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
   
  }
  componentDidMount() {
    const requestOptions = {
      headers: authHeader()
    }
    fetch(`https://stubhub.dataforest.tech/api/task_list` , requestOptions)
    .then(res => {
      if (res.status == 401) {
        userService.refreshToken()
      } else {
        return res.json()
      }
      
    })
  .then(
    (items) => {
      
      this.setState({
        data: items,
      
      });
      
      
    });
  }
  componentDidUpdate(nextState ,prevState) {
   
  if ( this.state.data !== nextState.data && this.state.data === prevState.data  ) {
    const requestOptions = {
      headers: authHeader()
    }
    
  fetch(`https://stubhub.dataforest.tech/api/task_list` , requestOptions)
  .then(res => {
    if (res.status == 401) {
      userService.refreshToken()
    } else {
      return res.json()
    }
    
  })
  .then(
    (items) => {
      
      this.setState({
        data: items,
      
      });
      
      
    });
  }
}



  AddTask(e) {
 
    e.preventDefault()
    const requestOptions = {
      headers: authHeader()
    }
    let addingtaskeventId = e.target.eventid.value
    let addingtaskvenu = e.target.venue.value
    const frequency = e.target.frequency.value
       
    fetch  (`https://stubhub.dataforest.tech/api/tasks/add?venue=${addingtaskvenu}&event=${addingtaskeventId}&frequency=${frequency}` , requestOptions)
    .then(res => {
      if (res.status == 401) {
        userService.refreshToken()
      } else {
        return res.json()
      }
      
    })
    .then(
      (result) => {
        
        this.setState({
          addtask: result,
         
        });
        
      });
     
  }
 
  deleteTask(value) {
 
      const deleteId = value
      const requestOptions = {
        headers: authHeader()
      }
    fetch  (`https://stubhub.dataforest.tech/api/tasks/delete?id=${deleteId}` , requestOptions)
    .then(res => {
      if (res.status == 401) {
        userService.refreshToken()
      } else {
        return res.json()
      }
      
    })
    .then(
      (result) => {
        
        this.setState({
          deletetask: result,
        
        });
      
      });
      
  }
  
  render() {
    const { data } = this.state;
   
  
    
    return (
      
      <div  className="task-content" >
       <TaskForm AddTask={this.AddTask} />
       
        <ReactTable 
          
         
          data={data}
         
          columns={[
            {
             
              columns: [
               
                {
                  Header: "Type",
                  id: 'Type',
                  accessor: "type",
                  
                },
                {
                  Header: "Event id/Venue",
                 
                  Cell: (props) => {
                    return <span>{props.original.event}{props.original.venue}</span>;
                  },
                },
                {
                  Header: "Frequency",
                  
                  accessor: "frequency",
                  
                },
                
              
                {
                  Header: "Delete Task", 
                  Cell: props => (
                    <button name="deletebutton"  value={props.original.id}  onClick={() => this.deleteTask(props.original.id) } >
                    <DeleteForeverOutlinedIcon /></button>
                )
                },
                  
                
               
                
                

              ]
            },
            
            
          ]}
          showPageJump={false}
          minRows = {0}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      
        <br />
     
      </div>
      
    );
  }
}

export default MainContent
