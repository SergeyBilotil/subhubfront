import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import TaskForm from './TaskForm'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import "./TaskTable.css"

class MainContent extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      addtask: '',
      data: [],
      taskID: ''
     
    };
    this.AddTask = this.AddTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
   
  }

componentDidMount() {
  
  fetch(`https://stubhub.dataforest.tech/api/task_list`)
  .then(res => res.json())
  .then(
    (items) => {
      
      this.setState({
        data: items,
        
      });
      
      
    });
  
}
  AddTask(e) {
 

    let setVenue = e.target.venue.value
   let seteventid = e.target.eventid.value
    let addingtaskeventId = e.target.eventid.value
    let addingtaskvenu = ''
    const frequency = e.target.frequency.value
    if (setVenue != '') {
      addingtaskvenu = e.target.venue.value
      addingtaskeventId = ""
    } else 
    {
      addingtaskeventId = e.target.eventid.value
      addingtaskvenu = ''
      
    }
     
    console.log(e.target.eventid.value)
     
    
    fetch  (`https://stubhub.dataforest.tech/api/tasks/add?venue=${addingtaskvenu}&event_id=${addingtaskeventId}&frequency=${frequency}`)
    .then(res => res.json())
    .then(
      (result) => {
        
        this.setState({
          addtask: result,
          
        });
      });
     
  }
  
  deleteTask(value) {
    this.forceUpdate()
      const deleteId = value
    console.log(deleteId)
    fetch  (`https://stubhub.dataforest.tech/api/tasks/delete?id=${deleteId}`)
    .then(res => res.json())
    .then(
      (result) => {
        
        this.setState({
          deletetask: result,
          
        });
      
      });
      
  }
  
  render() {
    const { data, taskID } = this.state;
    
    
   
    return (
      <div  className="task-content">
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
                    <button name="deletebutton" value={props.original.id}  onClick={() => this.deleteTask(props.original.id) } >
                    <DeleteForeverOutlinedIcon /></button>
                )
                },
                  
                
               
                
                

              ]
            },
            
            
          ]}
          
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
