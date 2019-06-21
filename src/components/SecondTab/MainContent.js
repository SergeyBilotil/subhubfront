import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./MainContent.css"
import MainHeader from './MainHeader'
import { authHeader } from '../RegisterPage/_helpers/auth-header';
import { userService } from '../RegisterPage/_services/user.service'


class MainContent extends React.Component {
  
  constructor() {
    super();
    this.state = {
      error: null,
      city: '',
      venue: '',
      data: [],
      
      shouldShowElem: false,
    };
    this.LoadMainData = this.LoadMainData.bind(this);
    this.submitNote = this.submitNote.bind(this);
  }
  submitNote() {
    this.setState({
        shouldShowElem: true,
    });
}
  LoadMainData(e,access_token) {
   e.preventDefault()
    const setCity = e.target.city.value
    const setVenue = e.target.venue.value
    const startDate = e.target.startdate.value
    const endDate = e.target.enddate.value
    const requestOptions = {
      headers: authHeader()
    }
     

    
    
     fetch  (`https://stubhub.dataforest.tech/api/events?venue=${setVenue}&city=${setCity}&start_date=${startDate}&end_date=${endDate}`, requestOptions )
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
          data: result,
          
        });
      
      });
 
  }
  
  
  render() {
    const { data } = this.state;
    
    
   
    return (
      <div >
       <MainHeader LoadMainData={this.LoadMainData} submitNote={this.submitNote}/>
       {this.state.shouldShowElem && 
        <ReactTable 
          
         
          data={data}
         
          showPageJump={false}
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
                  Header: "Time",
                  
                  accessor: "Time",
                  
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

export default MainContent
