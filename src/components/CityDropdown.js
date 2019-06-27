import React, { Component } from 'react'
import { userService } from './RegisterPage/_services/user.service'
import { authHeader } from './RegisterPage/_helpers/auth-header';
import Select from "react-select";
import './cityDropdown.css'

class CityDropdown extends Component {
    constructor(props) {
        super(props);
          this.state = {
            Listcities: [],
            ListVenues: [],
            venue: '',
            cityes: ''
            }
      }
      componentDidMount() {
        const requestOptions = {
          headers: authHeader()
        }
        
        fetch(`https://stubhub.dataforest.tech/api/cities` , requestOptions) 
        .then(res => {
          if (res.status == 401) {
            userService.refreshToken()
          } else {
            return res.json()
          }
          
        })
        .then(
          (items) => {
            
            this.setState({
              Listcities: items,
            
            });
            
          });
        
      }
      componentDidUpdate(prevState ,nextState ) {
        const requestOptions = {
          headers: authHeader()
        }
        const cityname = this.state.cityes
       
        if (this.state.cityes!== nextState.cityes || this.state.ListVenues == '' ) {
        fetch(`https://stubhub.dataforest.tech/api/venues?city=${cityname}` , requestOptions)
        .then(res => {
          if (res.status == 401) {
            userService.refreshToken()
          } else {
            return res.json()
          }
          
        })
        .then(
          (items2) => {
            
            this.setState({
              ListVenues: items2,
             
            });
           
          });
         
        }
      }
      handleChangeVenu = name => event => { 

        this.setState({
          venue: event,
        });
        
      };
    
    
    
       handleChange = name => event => {

        this.setState({
          city: event,
          cityes: event.map(item => {
            return item.value
          })
        });
      }    
    render() {
      
        return(
            <div className="city-dropdown">
             
              <Select
                defaultValue = ""
                name="city"
                placeholder= "All city"
                enableSearch
                isMulti
                value={this.state.city}
                onChange={this.handleChange()}
                options={this.state.Listcities.map(item => {
                  return { value: item ,label: item };
                })}
              />  
            <Select
                defaultValue = ""
                enableSearch
                placeholder= "All Venue"
                isMulti
                name="venue"
                value={this.state.venue}
                onChange={this.handleChangeVenu()}
                options={this.state.ListVenues.map(item => {
                  return { value: item.name ,label: item.name };
                })}
            />
  
              
                
                </div>
         
           
       
        )
    }
}

export default CityDropdown