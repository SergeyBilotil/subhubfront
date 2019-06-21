import React, { Component } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import LastTable from './LastTable';
import { authHeader } from '../RegisterPage/_helpers/auth-header';
import { userService } from '../RegisterPage/_services/user.service'

class LastItem extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      city: '',
      venue: '',
      Listcities: '',
      data: [],
      shouldShowElem: false,
    };
    this.LoadData = this.LoadData.bind(this);
    this.submitNote = this.submitNote.bind(this);
  }
  submitNote() {
    this.setState({
        shouldShowElem: true,
    });
}
  LoadData (e) {
    e.preventDefault()
    let Lastchangevenu = e.target.venue.value
    let liveevent_id = e.target.eventid.value
    const requestOptions = {
      headers: authHeader()
    }
    
    fetch(`https://stubhub.dataforest.tech/api/parse?venue=${Lastchangevenu}&id=${liveevent_id}` , requestOptions)
    .then(res => {
      if (res.status == 401) {
        userService.refreshToken()
      } else {
        return res.json()
      }
      
    })
    .then(
      (data) => {
        
        this.setState({
          data: data,
        
        });
        
    
      });
    
  }
  
  render() {
    const { data } = this.state;
    
  
    return (
      <div>
        <LastTable  LoadData={this.LoadData} submitNote={this.submitNote}/>
        {this.state.shouldShowElem &&
        <ReactTable 
          data={data}
          
         
          columns={[
            {
             
              columns: [
                {
                  Header: "City",
                  accessor: "City",
                  
                 
                 
                },
                {
                  Header: "Date",
                  
                  accessor: "Date",
                  
                },
                {
                  Header: "Name", 
                  accessor: "Name",
                  minWidth: 200,
                  
                },
                {
                  Header: "Performers", 
                  accessor: "Performers[0]",
                  
                },
                {
                  Header: "Status", 
                  accessor: "Status",
                  
                },
                {
                  Header: "Venue", 
                  accessor: "Venue",
                  
                },
                {
                  Header: "Currency Code", 
                  accessor: "currencyCode",
                  width: 150
                  
                },

                {
                  Header: "Max Price", 
                  accessor: "maxPrice",
                  width: 100
                  
                },
                {
                  Header: "Min Price", 
                  accessor: "minPrice",
                  width: 100
                  
                },
                {
                  Header: "Total Tickets", 
                  accessor: "totalTickets",
                  width: 100
                  
                },
                
                

              ]
            },
            
            
          ]}
          showPageJump={false}
          minRows = {0}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        }
        <br />
       
      </div>
    );
  }
}

export default LastItem
