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
 getData = async () => {
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
                 
                  Filter: ({ filter, onChange }) =>
                  <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : ""}
                  >
                    <option value="">All Name</option>
                    <option value=">potato">potato</option>
                    <option value="school">school</option>
                    <option value="flowers">flowers</option>
                    <option value="paint">paint</option>
                    <option value="wife">wife</option>
                    <option value="bfarm">farm</option>
                  </select>
                },
                {
                  Header: "Last Name",
                  id: "lastName",
                  accessor: d => d.lastName,
                  Filter: ({ filter, onChange }) =>
                  <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : ""}
                  >
                    <option value="">All Last Name</option>
                    <option value="cloud">cloud</option>
                    <option value="fcork">cork</option>
                  </select>
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
