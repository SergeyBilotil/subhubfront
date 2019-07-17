import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./MainContent.css"
import MainHeader from './MainHeader'
import { authHeader } from '../RegisterPage/_helpers/auth-header';
import { userService } from '../RegisterPage/_services/user.service'
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { red } from "@material-ui/core/colors";
import AbortController from "abort-controller"
import SubData from "../subData";

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
        width: 220,
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


class MainContent extends React.Component {
  
  constructor() {
    super();
    this.state = {
      error: null,
      city: '',
      venue: '',
      data: [],
      subdata: [],
      shouldShowElem: false,
      disabled: false
    };
    this.LoadMainData = this.LoadMainData.bind(this);
    this.submitNote = this.submitNote.bind(this);
    this.LoadSubData = this.LoadSubData.bind(this);
    
  }
  submitNote() {
    
   this.setState({
    shouldShowElem: false,
      
   })
 
}

  LoadMainData(e,access_token, ) {
   e.preventDefault()
    const setCity = Array.prototype.slice.call(e.target.city);
    let setCityMain  = Array.prototype.join.call(setCity.map(item => {
      return  item.value
   }), "|")
    if (setCityMain == '') {
      setCityMain = e.target.city.value
    } else {
     setCityMain = Array.prototype.join.call(setCity.map(item => {
      return  item.value
   }), "|")
  }
    const setVenue = Array.prototype.slice.call(e.target.venue);
    let setVenuMain =  Array.prototype.join.call(setVenue.map(item => {
      return  item.value
   }), "|")
    if (setVenuMain == '') {
      setVenuMain = e.target.venue.value
    } else {
      setVenuMain = Array.prototype.join.call(setVenue.map(item => {
      return  item.value
   }), "|")
  }

    const startDate = e.target.startdate.value
    const endDate = e.target.enddate.value
    const eventId = e.target.eventid.value
   
    const requestOptions = {
      headers: authHeader(),
      signal: signal
    }

    trackPromise(
     fetch  (`https://stubhub.dataforest.tech/api/events?id=${eventId}&venue=${setVenuMain}&city=${setCityMain}&start_date=${startDate}&end_date=${endDate}`, requestOptions )
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
          shouldShowElem: true,
          
        });
     
      }));
     
  }
  LoadSubData() {
    const requestOptions = {
      headers: authHeader(),
      signal: signal
    }

     fetch  (`https://stubhub.dataforest.tech/api/listings?event_id=104186681`, requestOptions)
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
          subdata: result,
        });
      
      });
     
  }
  
  render() {
    const { data } = this.state;
   
 
   
    return (
      <div >
        
       <MainHeader LoadMainData={this.LoadMainData} submitNote={this.submitNote} disabled={this.state.disabled} />
       <LoadingIndicator/>

       {this.state.shouldShowElem && 
        <ReactTable 
          
        
          data={data}
          SubComponent={row => {
           
            return (
              <div className="subtable" style={{ padding:  "20px" }}>
                <SubData subIdData={row.original.id}/>

              </div>
            )
          }}
          showPageJump={false}
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

export default MainContent
