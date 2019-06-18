import React, { Component } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import LastTable from './LastTable';


class LastItem extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      city: '',
      venue: '',
      Listcities: '',
      data: []
    };
    this.LoadData = this.LoadData.bind(this);
  }
  LoadData (e) {
    e.preventDefault()
    let Lastchangevenu = e.target.venue.value
    
    
    
    console.log(Lastchangevenu )
    fetch(`https://stubhub.dataforest.tech/api/parse?venue=${Lastchangevenu}`)
    .then(res => res.json())
    .then(
      (data) => {
        
        this.setState({
          data: data,
        
        });
        
      });
    
  }
  
  render() {
    const { data } = this.state;
    
    console.log(data)
    return (
      <div>
        <LastTable  LoadData={this.LoadData}/>
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
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
       
      </div>
    );
  }
}

export default LastItem
