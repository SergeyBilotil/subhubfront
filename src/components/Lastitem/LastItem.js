import React, { Component } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import LastTable from './LastTable';
import { authHeader } from '../RegisterPage/_helpers/auth-header';
import { userService } from '../RegisterPage/_services/user.service'
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { red } from "@material-ui/core/colors";
import AbortController from "abort-controller"
import SubData from '../subData';


const controller = new AbortController()
const signal = controller.signal
   const LoadingIndicator = props => {
       const { promiseInProgress } = usePromiseTracker();
       
       return (
         
         promiseInProgress   &&
         <div
               style={{
                 width: "100%",
                 height: "100",
                 background: red,
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center"
             }}
           >
               <Loader type="ThreeDots" color="#3D2F95" height="100" width="100" />
             </div>
      );  
     }

     const columns = [
      {
       
        columns: [
          {
            Header: "Date",
            accessor: "date",
            width: 100,
          },
          {
            Header: "Time", 
            accessor: "time",
            width: 100,
          },
          {
            Header: "Performers",
            width: 120,
            accessor: "performers",
            
          },
          {
            Header: "Venue", 
            accessor: "venue",
            minWidth: 100,
            
          },
          {
            Header: "City", 
            accessor: "city",
            width: 120,
          },
          {
            Header: "URL", 
            accessor: "URL",
            
          },
          {
            Header: "Status", 
            accessor: "status",
            
          },
          {
            Header: "Currency Code", 
            accessor: "currencyCode",
            width: 140
            
          },
    
       
          {
            Header: "Min Price", 
            accessor: "minPrice",
            width: 80
            
          },
          {
            Header: "Total Tickets", 
            accessor: "totalTickets",
            width: 150
            
          },
          {
            Header: "Total Listings", 
            accessor: "totalListings",
            width: 150
            
          },
        
          {
            Header: "Event ID", 
            accessor: "id",
            width: 100
            
          },
          {
            Header: "Timestamp", 
            accessor: "timestamp",
            width: 100      
          },
        ]
      },  
    ]


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
        shouldShowElem: false,
    });
}
  LoadData (e) {
    e.preventDefault()
    let Lastchangevenu = Array.prototype.slice.call(e.target.venue);
    let setVenuLast =  Array.prototype.join.call(Lastchangevenu.map(item => {
      return  item.value
   }), "|")
    if (setVenuLast == '') {
      setVenuLast = e.target.venue.value
    } else {
      setVenuLast = Array.prototype.join.call(Lastchangevenu.map(item => {
      return  item.value
   }), "|")
  }
    let liveevent_id = e.target.eventid.value
    const requestOptions = {
      headers: authHeader(),
      signal: signal
    }
    trackPromise(
    fetch(`https://stubhub.dataforest.tech/api/parse?venue=${setVenuLast}&id=${liveevent_id}` , requestOptions)
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
          shouldShowElem: true,
        
        });
        
    
      }));
    
  }
  
  render() {
    const { data } = this.state;
    
  
    return (
      <div>
        <LastTable  LoadData={this.LoadData} submitNote={this.submitNote}/>
        <LoadingIndicator/>

        {this.state.shouldShowElem &&
        <ReactTable 
          data={data}
        SubComponent={row => {
          return (
            <div className="subtable" style={{ padding: "20px" }}>
         
         
                <SubData subIdData={row.original.id} />
           
        
            </div>
          )
        }}
          columns={columns}
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
