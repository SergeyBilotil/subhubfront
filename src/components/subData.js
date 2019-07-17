import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { authHeader } from './RegisterPage/_helpers/auth-header';
import { userService } from './RegisterPage/_services/user.service'



const subColumns = [
    {
     
      columns: [
        {
          Header: "Section", 
          accessor: "Section",
        
        },
        {
          Header: "Prices",
          accessor: "Prices",
          width: 100,
        },
        
        {
          Header: "Row", 
          accessor: "Row",
          
          
        },
        {
          Header: "Qty", 
          accessor: "Qty",
          
        },
        {
          Header: "Ticket split", 
          accessor: "Ticket split",
          
        },
        {
          Header: "Delivery Type", 
          accessor: "Delivery Type",
          
          
        },
        {
          Header: "isGA", 
          accessor: "isGA",
          
          
        },
        {
          Header: "Id", 
          accessor: "id",
        
        },
  
      ]
    },
    
    
  ]
  class SubData extends React.Component {
    constructor() {
        super();
        this.state = {
          error: null,
          subdata2: [],
          shouldShowElem: false,
        };
       
        
      }
      componentDidMount() {
        const subIdData = this.props.subIdData
       
        const requestOptions = {
          headers: authHeader(),
        
        }
        
        
         fetch  (`https://stubhub.dataforest.tech/api/listings?event_id=${subIdData}`, requestOptions)
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
              subdata2: result,
            });
            console.log(result)
          });
         
      }
      
  
  render() {
    
   const subdata2 = this.state.subdata2
    
   
    return (
      <div >
        
      
        <ReactTable 
            minRows = {0}
            data={subdata2}
            columns={subColumns}
            showPagination={false}
           
        />
      
       

      
      
     
        <br />
     
      </div>
      
    );
  }
  }

export default SubData