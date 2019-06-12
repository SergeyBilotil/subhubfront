import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./MainContent.css"
class MainContent extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      city: '',
      venue: '',
      data: []
    };
  }

  loadData() {
   
    const setCity = this.props.city
    const setVenue = this.props.venue

    console.log(setCity, setVenue)
    
     
    
     fetch(`https://stubhub.dataforest.tech/events`)
    .then(res => res.json())
    .then(
      (result) => {
        
        this.setState({
          data: result,
        
        });
        console.log(result)
      });
    
  }
  
  
  render() {
    const { data } = this.state;
    
    
    return (
      <div >
       
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
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
       
      </div>
    );
  }
}

export default MainContent
