import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";
import matchSorter from 'match-sorter'
import MainHeader from './MainHeader';
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

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
 getData = async (e) => {
   e.preventDefault();
    const api_url = await
    fetch(`http://172.110.7.117:5000/events`)
    const item = await api_url.json
    console.log(item)
  }
  
  render() {
    const { items } = this.state;

    return (
      <div>
        <MainHeader getData={this.getData}/>
        <ReactTable
          data={items}
          
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
             
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName",
                 
                 
                 
                },
                {
                  Header: "Last Name",
                  id: "lastName",
                  accessor: d => d.lastName,
                  
                }
              ]
            },
            {
              
              columns: [
                {
                  Header: "Age",
                  accessor: "age"
                },
                {
                  Header: "Over 21",
                  accessor: "age",
                  id: "over",
                  Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
                  filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    if (filter.value === "true") {
                      return row[filter.id] >= 21;
                    }
                    return row[filter.id] < 21;
                  },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">Show All</option>
                      <option value="true">Can Drink</option>
                      <option value="false">Can't Drink</option>
                    </select>
                }
              ]
            }
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
